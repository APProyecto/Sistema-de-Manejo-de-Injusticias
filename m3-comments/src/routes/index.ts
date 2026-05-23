import { Router } from "express";
import commentsRouter from "../modules/comments/comments.routes";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M3 Comments API root",
  });
});

router.use("/comments", commentsRouter);

export default router;