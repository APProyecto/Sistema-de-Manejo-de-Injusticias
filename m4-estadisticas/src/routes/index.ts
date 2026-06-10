import { Router } from "express";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import trackingRouter from "../modules/tracking/tracking.routes";
import dashboardRoutes from "../modules/metrics/dashboard.routes";
import auditsRoutes from "../modules/audits/audits.routes";

const router = Router();

router.get("/", (_req, res) => {
    res.json({ 
        ok: true, 
        message: "M4 Statistics API root" 
    });
});


router.use("/analytics", analyticsRoutes);
router.use("/metrics", dashboardRoutes);
router.use("/tracking", trackingRouter);
router.use("/audits", auditsRoutes);

export default router;
