import {Router} from "express";
import {
    createComment, 
    deleteComment, 
    getComments
} from "./comments.controller";
const router = Router();

router.get("/getAll", getComments);
router.post("/create", createComment);
router.delete("/delete", deleteComment);

export default router;