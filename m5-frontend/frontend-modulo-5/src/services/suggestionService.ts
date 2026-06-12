import { commentApi } from "./api";

export interface Suggestion {
    SuggestionID: number;
    Subject: string;
    Description: string;
    SuggestedAt: string;
    AdminAnswer: string | null;
    SuggestionStateID: number;
    SuggestionState: { StateName: string };
    SuggestedByUser?: { Username: string; ProfilePicture: string | null };
}

export const createSuggestion = async (data: {
    subject: string;
    description: string;
    suggestedBy: number;
    }) => {
    const response = await commentApi.post("/api/suggestions", {
        subject: data.subject,
        description: data.description,
        suggestedBy: data.suggestedBy,
    });
    return response.data;
    };

export const getAllSuggestions = async (): Promise<Suggestion[]> => {
    const response = await commentApi.get<{ total: number; data: Suggestion[] }>(
        "/api/suggestions"
    );
    return response.data.data ?? [];
    };

export const replySuggestion = async (
    id: number,
    adminAnswer: string,
    adminId: number
    ) => {
    const response = await commentApi.patch(`/api/suggestions/${id}/reply`, {
        adminAnswer,
        adminId,
    });
    return response.data;
    };

export const updateSuggestionStatus = async (
    id: number,
    stateId: number,
    adminId: number
    ) => {
    const response = await commentApi.patch(`/api/suggestions/${id}/status`, {
        stateId,
        adminId,
    });
    return response.data;
    };