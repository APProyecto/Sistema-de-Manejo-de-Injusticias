import {Router} from "express";
import {
    getCommentReports,
    getBoycottReports,
    createCommentReport,
    createReportBoycott,
    closeReportBoycott,
    updateReportStatus,
    updateReportComment,
    getCommentReportCount,
    getBoycottReportCount
} from "./reports.controller";
const router = Router();

router.get("/getAll", getCommentReports);
router.get("/getBoycottReports", getBoycottReports);
router.get("/getCommentReportCount", getCommentReportCount);
router.get("/getBoycottReportCount", getBoycottReportCount);
router.post("/createComment", createCommentReport);
router.post("/createBoycottReport", createReportBoycott);
router.post("/closeReport", closeReportBoycott);
router.put("/updateStatus", updateReportStatus);
router.post("/updateReply", updateReportComment);


export default router;