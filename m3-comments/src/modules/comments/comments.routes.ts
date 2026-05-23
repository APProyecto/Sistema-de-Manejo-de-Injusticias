import {Router} from "express";
import {
    createComment, 
    getComments
} from "./comments.controller";
const router = Router();

router.get("/getAll", getComments);
router.post("/create", createComment);

export default router;