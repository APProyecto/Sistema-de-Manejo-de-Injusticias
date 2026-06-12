import { commentApi } from "./api";

import type { Comment, CommentReport, CreateCommentReport, ReportMotive } from "../types";

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

// Crear comentarios
export const createComment = async (
  description: string,
  boycottId: number,
  creatorId: number,
) => {
  const response = await commentApi.post("/api/comments/create", {
    Description: description,
    BoycottID: boycottId,
    CreatorId: creatorId,
  });

  return response.data.comment;
};

// Borrar comentarios
export const deleteComment = async (commentId: number) => {
  const response = await commentApi.delete("/api/comments/delete", {
    params: {
      CommentID: commentId,
    },
  });

  return response.data;
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
  }>(`/api/reports/createComment`, data);
  return response.data.report;
};

// Catálogo de motivos de reporte (parametrizable)
export const getReportMotives = async (): Promise<ReportMotive[]> => {
  const response = await commentApi.get<{ ok: boolean; motives: ReportMotive[] }>(
    `/api/reports/motives`,
  );
  return response.data.motives ?? [];
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
}

export const closeReport = async (reportId: number, adminId: number, adminReply: string, stateId: number): Promise<CommentReport> => {
  const response = await commentApi.put<{ ok: boolean; report: CommentReport }>(`/api/reports/closeReport`, { reportId, adminId, adminReply, stateId });
  return response.data.report;
}

// Buzón de sugerencias
export const createSuggestion = async (
  subject: string,
  description: string,
  suggestedBy: number,
) => {
  const response = await commentApi.post(`/api/suggestions`, {
    subject,
    description,
    suggestedBy,
  });
  return response.data;
};
