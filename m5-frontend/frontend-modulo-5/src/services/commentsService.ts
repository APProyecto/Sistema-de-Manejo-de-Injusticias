import { commentApi } from "./api";

import type { Comment, CommentReport, CreateCommentReport } from "../types";

export const getComments = async (
  id: number,
  filter: number,
  loggedUserId?: number,
): Promise<Comment[]> => {
  const response = await commentApi.get<{ ok: boolean; comments: Comment[] }>(
    `/api/comments/getAll`,
    {
      params: {
        BoycottID: id,
        SortBy: filter,
        LoggedUserID: loggedUserId,
      },
    },
  );

  return response.data.comments ?? [];
};

// Votos en comentarios
export const voteComment = async (
  userId: number,
  commentId: number,
  isInFavor: boolean,
) => {
  const response = await commentApi.post("/api/comments/vote", {
    UserID: userId,
    CommentID: commentId,
    IsInFavor: isInFavor,
  });

  return response.data.comment;
};

// Borrar votos en comentarios
export const deleteCommentVote = async (userId: number, commentId: number) => {
  const response = await commentApi.delete("/api/comments/vote", {
    data: {
      UserID: userId,
      CommentID: commentId,
    },
  });

  return response.data.comment;
};

// Reportes de comentarios
export const getCommentReports = async (
  search?: string,
  state?: string,
): Promise<CommentReport[]> => {
  const response = await commentApi.get<{
    ok: boolean;
    reports: CommentReport[];
  }>(`/api/reports/getAll`, { params: { search, state } });
  return response.data.reports ?? [];
};

export const createCommentReport = async (
  data: CreateCommentReport,
): Promise<CommentReport> => {
  const response = await commentApi.post<{
    ok: boolean;
    report: CommentReport;
  }>(`/api/reports/createCommentReport`, data);
  return response.data.report;
};

export const updateReportStatus = async (
  reportId: number,
  status: number,
  userId: number,
): Promise<CommentReport> => {
  const response = await commentApi.put<{ ok: boolean; report: CommentReport }>(
    `/api/reports/updateStatus`,
    { reportId, status, userId },
  );
  return response.data.report;
};
