import {Router} from "express";
import {
    getCommentReports,
    createCommentReport,
    updateReportStatus
} from "./reports.controller";
const router = Router();

router.get("/getAll", getCommentReports);
router.post("/createComment", createCommentReport);
router.put("/updateStatus", updateReportStatus);


export default router;