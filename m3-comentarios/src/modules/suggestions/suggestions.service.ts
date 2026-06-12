import { prisma } from "../../config/prisma";

export async function getAll() {
    return prisma.suggestionBox.findMany({
    orderBy: { SuggestedAt: "desc" },
    include: { SuggestionState: true },
    });
}

export async function getById(id: number) {
    return prisma.suggestionBox.findUnique({
    where: { SuggestionID: id },
    include: { SuggestionState: true },
    });
}

export async function create(data: {
    subject: string;
    description: string;
    suggestedBy: number;
}) {
    return prisma.suggestionBox.create({
    data: {
        Subject: data.subject,
        Description: data.description,
        SuggestedBy: data.suggestedBy,
        SuggestionStateID: 1,
        SuggestedAt: new Date(),
        CreatedAt: new Date(),
        CreatedBy: data.suggestedBy,
        ModifiedAt: new Date(),
        ModifiedBy: data.suggestedBy,
        },
    });
}

export async function reply(id: number, adminAnswer: string, adminId: number) {
    return prisma.suggestionBox.update({
    where: { SuggestionID: id },
    data: {
        AdminAnswer: adminAnswer,
        CheckedBy: adminId,
        CheckedAt: new Date(),
        AnsweredAt: new Date(),
        ModifiedAt: new Date(),
        ModifiedBy: adminId,
        },
    });
}

export async function updateStatus(id: number, stateId: number, adminId: number) {
    return prisma.suggestionBox.update({
    where: { SuggestionID: id },
    data: {
        SuggestionStateID: stateId,
        CheckedBy: adminId,
        CheckedAt: new Date(),
        ModifiedAt: new Date(),
        ModifiedBy: adminId,
        },
    });
}