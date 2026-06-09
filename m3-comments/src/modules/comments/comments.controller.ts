import {Request, Response} from "express";
import { prisma } from "../../config/prisma";

/*
    Function: getComments.
    Inputs: Request object containing BoycottID in the query.
    Description: Retrieves comments for a specific boycott, ordered by:
        1 = Publication date descending
        2 = Publication date ascending
        3 = Total interactions (VotesInFavor + VotesAgainst) descending
        4 = Total interactions (VotesInFavor + VotesAgainst) ascending
        For each comment, fetches the creator's username and profile picture from MongoDB.
    Outputs: JSON response with an array of comments or an error message.
*/
type SortOrder = "asc" | "desc";

const SORT_OPTIONS: Record<number, { field: string; order: SortOrder }> = {
    1: { field: "CommentDate", order: "desc" },
    2: { field: "CommentDate", order: "asc"  },
    3: { field: "interactions", order: "desc" },
    4: { field: "interactions", order: "asc"  },
};

export async function getComments(req: Request, res: Response) {
    try {
        const { BoycottID, SortBy } = req.query;

        const sortCode = parseInt(SortBy as string) || 1;
        const sortOption = SORT_OPTIONS[sortCode] ?? SORT_OPTIONS[1];
        const isInteractionSort = sortOption.field === "interactions";

        const comments = await prisma.commentBoycott.findMany({
            where: {
                BoycottID: parseInt(BoycottID as string),
                CommentStateID: 1,
            },
            select: {
                CommentBoycottID: true,
                Description: true,
                CommentDate: true,
                CreatorID: true,
                VotesInFavor: true,
                VotesAgainst: true,
                CommentState: true,
            },
            orderBy: !isInteractionSort
                ? { [sortOption.field]: sortOption.order }
                : undefined,
        });

        if (isInteractionSort) {
            comments.sort((a, b) => {
                const interactionsA = a.VotesInFavor + a.VotesAgainst;
                const interactionsB = b.VotesInFavor + b.VotesAgainst;
                return sortOption.order === "desc"
                    ? interactionsB - interactionsA
                    : interactionsA - interactionsB;
            });
        }

        const uniqueCreatorIDs = [...new Set(comments.map((c) => c.CreatorID))];

        const userProfiles = await Promise.all(
            uniqueCreatorIDs.map(async (creatorId) => {
                const appUser = await prisma.appUser.findUnique({
                    where: { UserID: creatorId },
                    select: {
                        UserID: true,
                        UserName: true
                    },
                });

                if (!appUser) return { creatorId, userName: null};

                return {
                    creatorId,
                    userName: appUser.UserName,
                };
            })
        );

        const userProfileMap = new Map(
            userProfiles.map((profile) => [profile.creatorId, profile])
        );

        const enrichedComments = comments.map((comment) => {
            const profile = userProfileMap.get(comment.CreatorID);
            return {
                ...comment,
                interactions: comment.VotesInFavor + comment.VotesAgainst,
                userName: profile?.userName ?? null,
            };
        });

        res.json({
            ok: true,
            comments: enrichedComments,
        });
    } catch (error) {
        console.error("getComments error:", error);
        res.status(500).json({
            ok: false,
            error: "Internal server error",
        });
    }
}


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