import {Request, Response} from "express";
import { prisma } from "../../config/prisma";


/*
    Function: getCommentReports. Filters reports based on optional search and state parameters.
    Inputs: Request object containing optional search and state.
    Description: Retrieves all the existing reports for comments.
    Outputs: JSON response with the list of reports or an error message.
*/
export async function getCommentReports(req: Request, res: Response){
	try {
		const { search, state } = req.query;
		const filter: any = {ReportComment: {isNot: null}};

		if (search && String(search).trim() !== ""){
			const searchText = String(search).trim();
			filter.AND = filter.AND || [];
			filter.AND.push({
				OR: [
					{MotiveReport: {MotiveName: {contains: searchText, mode: 'insensitive'}}},
					{ReportComment: {CommentBoycott: {Description: {contains: searchText, mode: 'insensitive'}}}},
				],
			});
		}

		if (state && String(state).trim() !== "") {
			const st = String(state).trim();
			const stateCode = parseInt(st);
			filter.AND = filter.AND || [];
			if (!isNaN(stateCode)) {
				filter.AND.push({ReportStateID: stateCode});
			} else {
				filter.AND.push({ReportState: {StateName: {contains: st, mode: 'insensitive'}}});
			}
		}

		const reports = await prisma.report.findMany({
			where: filter,
			select: {
				UserDescription: true,
				ReportedAt: true,
				ReportState: {select:{StateName: true}},
				MotiveReport: {select:{MotiveName:true}},
				ReportComment: {select: {CommentBoycott: {select: {Description: true}}}},
			},
			orderBy: { ReportedAt: 'desc' },
		});

        res.json({ ok: true, reports });

	} catch (error) {
		console.error("getCommentReports error:", error);
		res.status(500).json({ ok: false, error: "Internal server error" });
	}
}



/*
    Function: createCommentReport.
    Inputs: Request object containing userDescription, commentId, motiveReportId, ReportedBy, asubject in the body.
    Description: Creates a new report for a specific comment in a boycott.
    Outputs: JSON response with the created report or an error message.
*/
export async function createCommentReport(req: Request, res: Response) {
	try {
		const { UserDescription, MotiveReportID, ReportedBy, commentId, Subject } = req.body;
		const newReport = await prisma.report.create({
			data: {
				Subject,
				UserDescription,
				MotiveReportID: parseInt(MotiveReportID as string),
				ReportedBy: parseInt(ReportedBy as string),
				ReportStateID: 1,
			},
		});

		await prisma.reportComment.create({ data: { ReportCommentID: newReport.ReportID, CommentID: parseInt(commentId as string) } });

		res.status(201).json({ ok: true, report: newReport });
	} catch (error) {
		console.error('createCommentReport error:', error);
		res.status(500).json({ ok: false, error: 'Internal server error' });
	}
}


/*
    Function: updateReportStatus.
    Inputs: Request object containing reportId and status (1=approved/2=rejected) in the body.
    Description: Updates the status of a comment report.
    Outputs: JSON response with the updated report or an error message.
*/
export async function updateReportStatus(req: Request, res: Response) {
	try {
		const { reportId, status } = req.body;
	
		const updatedReport = await prisma.report.update({
			where: { ReportID: parseInt(reportId as string) },
			data: { ReportStateID: status }
		});

		res.json({ ok: true, report: updatedReport });
	} catch (error) {
		console.error('updateReportStatus error:', error);
		res.status(500).json({ ok: false, error: 'Internal server error' });
	}
}


