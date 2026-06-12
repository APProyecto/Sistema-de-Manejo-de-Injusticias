import { Request, Response } from "express";
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

const SORT_OPTIONS: Record<
  number,
  {
    field: string;
    order: SortOrder;
  }
> = {
  0: { field: "CommentDate", order: "desc" },
  1: { field: "CommentDate", order: "asc" },
  2: { field: "interactions", order: "desc" },
  3: { field: "interactions", order: "asc" },
};

export async function getComments(req: Request, res: Response) {
  try {
    const { BoycottID, SortBy, LoggedUserID } = req.query;
    const boycottId = Number.parseInt(String(BoycottID ?? ""), 10);

    if (!Number.isInteger(boycottId) || boycottId <= 0) {
      res.status(400).json({
        ok: false,
        error: "BoycottID is required and must be a positive integer",
      });
      return;
    }

    const sortCode = SortBy !== undefined ? parseInt(SortBy as string) : 0;
    const sortOption = SORT_OPTIONS[sortCode] ?? SORT_OPTIONS[0];
    const isInteractionSort = sortOption.field === "interactions";

    const loggedUserID = LoggedUserID ? parseInt(LoggedUserID as string) : null;

    const comments = await prisma.commentBoycott.findMany({
      where: {
        BoycottID: boycottId,
        CommentStateID: 1,
      },
      select: {
        CommentBoycottID: true,
        BoycottID: true,
        Description: true,
        CommentDate: true,
        CreatorID: true,
        VotesInFavor: true,
        VotesAgainst: true,
        CommentState: true,
        UserVotesComment: loggedUserID
          ? {
              where: { UserID: loggedUserID },
              select: { IsInFavor: true },
            }
          : false,
      },
      orderBy: !isInteractionSort
        ? { [sortOption.field]: sortOption.order }
        : undefined,
    });

    if (isInteractionSort) {
      comments.sort((a, b) => {
        const interactionsA = a.VotesInFavor - a.VotesAgainst;
        const interactionsB = b.VotesInFavor - b.VotesAgainst;
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
            UserName: true,
          },
        });

        if (!appUser) return { creatorId, userName: null };

        return { creatorId, userName: appUser.UserName };
      }),
    );

    const userProfileMap = new Map(
      userProfiles.map((profile) => [profile.creatorId, profile]),
    );

    const enrichedComments = comments.map((comment) => {
      const profile = userProfileMap.get(comment.CreatorID);
      const vote = comment.UserVotesComment?.[0];

      return {
        id: comment.CommentBoycottID,
        post_id: comment.BoycottID,
        user: {
          id: comment.CreatorID,
          username: profile?.userName ?? "",
          profilePicture: `https://fair-boycott.sytes.net/api/files/appUser/${comment.CreatorID}/picture`,
        },
        content: comment.Description,
        creation_date: comment.CommentDate.toISOString(),
        votes: `${comment.VotesInFavor - comment.VotesAgainst}`,
        voted_by_user: vote ? vote.IsInFavor : null,
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
}

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
}

/*
    Function: voteComment.
    Inputs: UserID, CommentID, IsInFavor in body.
    Description: Creates or updates a user's vote on a comment.
*/
export async function voteComment(req: Request, res: Response) {
  try {
    const { UserID, CommentID, IsInFavor } = req.body;

    const userId = parseInt(UserID as string);
    const commentId = parseInt(CommentID as string);
    const isInFavor = Boolean(IsInFavor);

    if (!userId || !commentId || typeof IsInFavor !== "boolean") {
      return res.status(400).json({
        ok: false,
        error: "UserID, CommentID and IsInFavor are required",
      });
    }

    const comment = await prisma.commentBoycott.findUnique({
      where: { CommentBoycottID: commentId },
    });

    if (!comment || comment.CommentStateID !== 1) {
      return res.status(404).json({
        ok: false,
        error: "Comment not found or inactive",
      });
    }

    await prisma.userVotesComment.upsert({
      where: {
        UserID_CommentID: {
          UserID: userId,
          CommentID: commentId,
        },
      },
      update: {
        IsInFavor: isInFavor,
        ModifiedAt: new Date(),
        ModifiedBy: userId,
      },
      create: {
        UserID: userId,
        CommentID: commentId,
        IsInFavor: isInFavor,
        CreatedBy: userId,
      },
    });

    const votesInFavor = await prisma.userVotesComment.count({
      where: {
        CommentID: commentId,
        IsInFavor: true,
      },
    });

    const votesAgainst = await prisma.userVotesComment.count({
      where: {
        CommentID: commentId,
        IsInFavor: false,
      },
    });

    const updatedComment = await prisma.commentBoycott.update({
      where: { CommentBoycottID: commentId },
      data: {
        VotesInFavor: votesInFavor,
        VotesAgainst: votesAgainst,
        ModifiedAt: new Date(),
        ModifiedBy: userId,
      },
    });

    return res.json({
      ok: true,
      message: "Vote saved successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("voteComment error:", error);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

/*
    Function: deleteCommentVote.
    Inputs: UserID and CommentID in body.
    Description: Deletes a user's vote from a comment and recalculates vote counters.
*/
export async function deleteCommentVote(req: Request, res: Response) {
  try {
    const { UserID, CommentID } = req.body;

    const userId = parseInt(UserID as string);
    const commentId = parseInt(CommentID as string);

    if (!userId || !commentId) {
      return res.status(400).json({
        ok: false,
        error: "UserID and CommentID are required",
      });
    }

    const existingVote = await prisma.userVotesComment.findUnique({
      where: {
        UserID_CommentID: {
          UserID: userId,
          CommentID: commentId,
        },
      },
    });

    if (!existingVote) {
      return res.status(404).json({
        ok: false,
        error: "Vote not found",
      });
    }

    await prisma.userVotesComment.delete({
      where: {
        UserID_CommentID: {
          UserID: userId,
          CommentID: commentId,
        },
      },
    });

    const votesInFavor = await prisma.userVotesComment.count({
      where: {
        CommentID: commentId,
        IsInFavor: true,
      },
    });

    const votesAgainst = await prisma.userVotesComment.count({
      where: {
        CommentID: commentId,
        IsInFavor: false,
      },
    });

    const updatedComment = await prisma.commentBoycott.update({
      where: { CommentBoycottID: commentId },
      data: {
        VotesInFavor: votesInFavor,
        VotesAgainst: votesAgainst,
        ModifiedAt: new Date(),
        ModifiedBy: userId,
      },
    });

    return res.json({
      ok: true,
      message: "Vote deleted successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("deleteCommentVote error:", error);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}
