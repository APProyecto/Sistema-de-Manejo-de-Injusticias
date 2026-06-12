import {Router} from "express";
import {
    getCommentReports,
    getBoycottReports,
    createCommentReport,
    createReportBoycott,
    closeReportBoycott,
    updateReportStatus,
    getCommentReportCount,
    getBoycottReportCount,
    getMotives
} from "./reports.controller";
const router = Router();

router.get("/getAll", getCommentReports);
router.get("/getBoycottReports", getBoycottReports);
router.get("/getCommentReportCount", getCommentReportCount);
router.get("/getBoycottReportCount", getBoycottReportCount);
router.get("/motives", getMotives);
router.post("/createComment", createCommentReport);
router.post("/createBoycottReport", createReportBoycott);
router.post("/closeReport", closeReportBoycott);
router.put("/updateStatus", updateReportStatus);


export default router;