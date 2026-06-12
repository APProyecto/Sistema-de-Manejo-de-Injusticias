import {Request, Response} from "express";
import { prisma } from "../../config/prisma";
import { join } from "node:path";


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
				ReportID: true,
				UserDescription: true,
				ReportedAt: true,
				ReportState: {select:{StateName: true}},
				MotiveReport: {select:{MotiveName:true}},
				ReportComment: {select: {CommentBoycott: {select: {Description: true}}}},
				AppUser_Report_ReportedByToAppUser: {select: {UserName: true}}
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
    Function: getBoycottReports. Filters reports based on optional search and state parameters.
    Inputs: Request object containing optional search and state.
    Description: Retrieves all the existing reports for boycotts.
    Outputs: JSON response with the list of reports or an error message.	
*/
export async function getBoycottReports(req: Request, res: Response){
	try {
		const { search, state } = req.query;
		const filter: any = {ReportBoycott: {isNot: null}};

		if (search && String(search).trim() !== "") {
		const searchText = String(search).trim();

		filter.AND = filter.AND || [];
		filter.AND.push({
			OR: [
				{
					MotiveReport: {
						MotiveName: {
							contains: searchText,
							mode: 'insensitive',
						},
					}
				},
				{
					ReportBoycott: {
						Boycott: {
							Title: {
								contains: searchText,
								mode: 'insensitive',
							},
						},
					},
				},
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
				ReportID: true,
				UserDescription: true,
				Subject: true,
				ReportedAt: true,
				ReportedBy: true,
				AdminAnswer: true,
				CheckedBy: true,
				ReportState: {select:{StateName: true}},
				MotiveReport: {select:{MotiveName:true}},
				ReportBoycott: {select: {Boycott: {select: {Title: true, BoycottID:true}}}},
				AppUser_Report_ReportedByToAppUser: {select: {UserName: true}}
			},
			orderBy: { ReportedAt: 'desc' },
		});

        res.json({ ok: true, reports });

	} catch (error) {
		console.error("getBoycottReports error:", error);
		res.status(500).json({ ok: false, error: "Internal server error" });
	}
}

/*
    Function: getMotives.
    Inputs: None.
    Description: Returns the catalog of report motives so the frontend can show them.
    Outputs: JSON response with the list of motives or an error message.
*/
export async function getMotives(_req: Request, res: Response) {
	try {
		const motives = await prisma.motiveReport.findMany({
			select: { MotiveReportID: true, MotiveName: true },
			orderBy: { MotiveName: 'asc' },
		});
		res.json({ ok: true, motives });
	} catch (error) {
		console.error('getMotives error:', error);
		res.status(500).json({ ok: false, error: 'Internal server error' });
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
		const { UserDescription, MotiveReportID, ReportedBy, CommentId, Subject } = req.body;
		const newReport = await prisma.report.create({
			data: {
				Subject,
				UserDescription,
				MotiveReportID: parseInt(MotiveReportID as string),
				ReportedBy: parseInt(ReportedBy as string),
				ReportStateID: 1,
				CreatedBy: parseInt(ReportedBy as string),
			},
		});

		await prisma.reportComment.create({ data: { ReportCommentID: newReport.ReportID, CommentID: parseInt(CommentId as string) } });

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
		const { reportId, status, userId } = req.body;
	
		const updatedReport = await prisma.report.update({
			where: { ReportID: parseInt(reportId as string) },
			data: {
				ReportStateID: status,
				ModifiedBy: parseInt(userId as string),
			}
		});

		res.json({ ok: true, report: updatedReport });
	} catch (error) {
		console.error('updateReportStatus error:', error);
		res.status(500).json({ ok: false, error: 'Internal server error' });
	}
}

/*
    Function: createReportBoycott
    Inputs: Request object containing userDescription, boycottId, motiveReportId, ReportedBy and subject in the body.
    Description: Creates a new report for a specific boycott post.
    Outputs: JSON response with the created report or an error message.
*/
export async function createReportBoycott(req: Request, res: Response) {
	try {
		const { UserDescription, BoycottId, MotiveReportID, ReportedBy, Subject } = req.body;
		const newReport = await prisma.report.create({
			data: {
				Subject,
				UserDescription,
				MotiveReportID: parseInt(MotiveReportID as string),
				ReportedBy: parseInt(ReportedBy as string),
				ReportStateID: 1,
			},
		});

		await prisma.reportBoycott.create({ data: { ReportBoycottID: newReport.ReportID, BoycottID: parseInt(BoycottId as string) } });

		res.status(201).json({ ok: true, report: newReport });
	} catch (error) {
		console.error('createReportBoycott error:', error);
		res.status(500).json({ ok: false, error: 'Internal server error' });
	}
}

/*
    Function: closeReportBoycott
    Inputs: Request object containing reportId, adminId, adminReply and status (1=approved/2=rejected) in the body.
    Description: Updates the status of a comment report.
    Outputs: JSON response with the updated report or an error message.
*/
export async function closeReportBoycott(req: Request, res: Response) {
	try {
		const { reportId, adminId, adminReply, stateId } = req.body;
	
		const updatedReport = await prisma.report.update({
			where: { ReportID: parseInt(reportId as string) },
			data: { ReportStateID: stateId,
					ModifiedBy: parseInt(adminId as string),
					AdminAnswer: adminReply,
					CheckedBy: adminId}
			// Is the modified date saved as well? We'll soon find out
		});

		res.json({ ok: true, report: updatedReport });
	} catch (error) {
		console.error('closeReportBoycott error:', error);
		res.status(500).json({ ok: false, error: 'Internal server error' });
	}
}


/*
    Function: getCommentReportCount
    Inputs: Request object containing state in the body.
    Description: Counts the comment reports by state (approved, pending, rejected).
	Hint: Pending = 1, Approved = 2, Rejected = 3, In review (not used) = 4
    Outputs: JSON response with the count result or an error message.
*/
export async function getCommentReportCount(req: Request, res: Response){
	try {
		const {state} = req.query;

		if (state && String(state).trim() !== "") {
			const st = String(state).trim();
			const stateCode = parseInt(st);
			const postCount = await prisma.reportComment.count({
				where: {
					Report: {
						ReportStateID: stateCode,
					}
				},
			});
			
        	res.json({ ok: true, postCount });
		} else {
			res.status(666).json({ ok: false, error: "Report state missing." });
		}

	} catch (error) {
		console.error("getCommentReportCount error:", error);
		res.status(500).json({ ok: false, error: "Internal server error" });
	}
}

/*
    Function: getCommentReportCount
    Inputs: Request object containing state in the body.
    Description: Counts the comment reports by state (approved, pending, rejected).
	Hint: Pending = 1, Approved = 2, Rejected = 3, In review (not used) = 4
    Outputs: JSON response with the count result or an error message.
*/
export async function getBoycottReportCount(req: Request, res: Response){
	try {
		const {state} = req.query;

		if (state && String(state).trim() !== "") {
			const st = String(state).trim();
			const stateCode = parseInt(st);
			const postCount = await prisma.reportBoycott.count({
				where: {
					Report: {
						ReportStateID: stateCode,
					}
				},
			});
			
        	res.json({ ok: true, postCount });
		} else {
			res.status(666).json({ ok: false, error: "Report state missing." });
		}

	} catch (error) {
		console.error("getBoycottReportCount error:", error);
		res.status(500).json({ ok: false, error: "Internal server error" });
	}
}


