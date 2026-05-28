import { Request, Response } from "express";
import * as service from "./suggestions.service";

export async function getAllSuggestions(_req: Request, res: Response) {
    try {
        const data = await service.getAll();
        return res.json({ total: data.length, data });
    } catch (error) {
        console.error("getAllSuggestions error:", error);
        return res.status(500).json({ error: "Internal server error" });
        }
    }

export async function getSuggestionById(req: Request, res: Response) {
    try {
        const suggestion = await service.getById(Number(req.params.id));
        if (!suggestion) return res.status(404).json({ error: "Not found" });
        return res.json(suggestion);
    } catch (error) {
        console.error("getSuggestionById error:", error);
        return res.status(500).json({ error: "Internal server error" });
        }
    }

export async function createSuggestion(req: Request, res: Response) {
    try {
        const { subject, description, suggestedBy } = req.body;
        if (!subject || !description || !suggestedBy) {
        return res.status(400).json({
            error: "subject, description and suggestedBy are required",
        });
        }
        const suggestion = await service.create({
        subject,
        description,
        suggestedBy: Number(suggestedBy),
        });
        return res.status(201).json(suggestion);
    } catch (error) {
        console.error("createSuggestion error:", error);
        return res.status(500).json({ error: "Internal server error" });
        }
    }

export async function replyToSuggestion(req: Request, res: Response) {
    try {
        const { adminAnswer, adminId } = req.body;
        if (!adminAnswer || !adminId) {
        return res.status(400).json({
            error: "adminAnswer and adminId are required",
        });
        }
        const updated = await service.reply(
        Number(req.params.id),
        adminAnswer,
        Number(adminId)
        );
        return res.json(updated);
    } catch (error) {
        console.error("replyToSuggestion error:", error);
        return res.status(500).json({ error: "Internal server error" });
        }
    }

export async function updateSuggestionStatus(req: Request, res: Response) {
    try {
        const { stateId, adminId } = req.body;
        if (!stateId || !adminId) {
        return res.status(400).json({
            error: "stateId and adminId are required",
        });
        }
        const updated = await service.updateStatus(
        Number(req.params.id),
        Number(stateId),
        Number(adminId)
        );
        return res.json(updated);
    } catch (error) {
        console.error("updateSuggestionStatus error:", error);
        return res.status(500).json({ error: "Internal server error" });
        }
    }