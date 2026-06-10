import { Router } from "express";
import {
    getAllSuggestions,
    getSuggestionById,
    createSuggestion,
    replyToSuggestion,
    updateSuggestionStatus,
    } from "./suggestions.controller";

const router = Router();

router.get("/", getAllSuggestions);
router.get("/:id", getSuggestionById);
router.post("/", createSuggestion);
router.patch("/:id/reply", replyToSuggestion);
router.patch("/:id/status", updateSuggestionStatus);

export default router;