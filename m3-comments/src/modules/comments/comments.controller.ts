import {Request, Response} from "express";
import { prisma } from "../../config/prisma";

/*
    Function: getComments.
    Inputs: Request object containing BoycottID in the body.
    Description: Retrieves comments for a specific boycott, ordered by votes in favor.
    Outputs: JSON response with an array of comments or an error message.
*/
export async function getComments(req: Request, res: Response) {
    try {
        const { BoycottID } = req.query;
        const comments = await prisma.commentBoycott.findMany({
            where: {
                BoycottID: parseInt(BoycottID as string),
                CommentStateID: 1,
            },
            select: {
                Description: true,
                CommentDate: true,
                CreatorID: true,
                VotesInFavor: true,
                VotesAgainst: true,
                CommentState: true,
            }, orderBy: {
                VotesInFavor: "desc",
            },
        });
        res.json({
            ok: true,
            comments,
        });
    } catch (error) {
        console.error("getComments error:", error);

        res.status(500).json({
            ok: false,
            error: "Internal server error",
        });
    }
};

/*
    Function: createComment.
    Inputs: Request object containing Description, BoycottID, and CreatorId in the body.
    Description: Creates a new comment for a specific boycott.
    Outputs: JSON response with the created comment or an error message.
*/
export async function createComment(req: Request, res: Response) {
    try {
        const { Description, BoycottID, CreatorId } = req.body;
        const newComment = await prisma.commentBoycott.create({
            data: {
                Description,
                BoycottID: parseInt(BoycottID as string),
                CreatorID: parseInt(CreatorId as string),
                CommentStateID: 1,
            },
        });
        res.json({
            ok: true,
            comment: newComment,
        });
    } catch (error) {
        console.error("createComment error:", error);

        res.status(500).json({
            ok: false,
            error: "Internal server error",
        });
    }
};

/*
    Function: deleteComment.
    Inputs: Request object containing CommentID in the body.
    Description: Marks a comment as deleted by updating its CommentStateID.
    Outputs: JSON response indicating success or failure of the operation.
*/
export async function deleteComment(req: Request, res: Response) {
    try {
        const { CommentID } = req.query;
        await prisma.commentBoycott.update({
            where: {
                CommentBoycottID: parseInt(CommentID as string),
            },
            data: {
                CommentStateID: 2,
            },
        });
        res.json({
            ok: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.error("deleteComment error:", error);

        res.status(500).json({
            ok: false,
            error: "Internal server error",
        });
    }
};
