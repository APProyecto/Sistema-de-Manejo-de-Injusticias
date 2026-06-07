import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  voteComment,
  deleteCommentVote,
} from "./comments.controller";
const router = Router();

router.get("/getAll", getComments);
router.post("/create", createComment);
router.post("/vote", voteComment);
router.delete("/delete", deleteComment);
router.delete("/vote", deleteCommentVote);

export default router;
