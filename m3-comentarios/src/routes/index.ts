import { Router } from "express";
import commentsRouter from "../modules/comments/comments.routes";
import suggestionsRouter from "../modules/suggestions/suggestions.routes";
import reportsRouter from "../modules/reports/reports.routes";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M3 Comments API root",
  });
});

router.use("/comments", commentsRouter);
router.use("/suggestions", suggestionsRouter);
router.use("/reports", reportsRouter);

export default router;