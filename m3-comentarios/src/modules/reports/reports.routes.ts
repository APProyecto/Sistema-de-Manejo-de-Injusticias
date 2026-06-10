import {Router} from "express";
import {
    getCommentReports,
    getBoycottReports,
    createCommentReport,
    createReportBoycott,
    closeReportBoycott,
    updateReportStatus
} from "./reports.controller";
const router = Router();

router.get("/getAll", getCommentReports);
router.get("/getBoycottReports", getBoycottReports);
router.post("/createComment", createCommentReport);
router.post("/createBoycottReport", createReportBoycott);
router.post("/closeReport", closeReportBoycott);
router.put("/updateStatus", updateReportStatus);


export default router;