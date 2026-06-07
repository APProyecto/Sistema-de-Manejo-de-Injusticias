import { Router } from "express";
import commentsRouter from "../modules/comments/comments.routes";
import suggestionsRouter from "../modules/suggestions/suggestions.routes";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M3 Comments API root",
  });
});

router.use("/comments", commentsRouter);
router.use("/suggestions", suggestionsRouter);

export default router;