import { commentApi } from "./api"

import type { Comment } from "../types"

export const getComments = async (id: number, filter: number): Promise<Comment[]> => {
  const response = await commentApi.get<{ ok: boolean, comments: Comment[] }>(
    `/api/comments/getAll?BoycottID=${id}&SortBy=${filter}`
  );
  return response.data.comments ?? [];
}