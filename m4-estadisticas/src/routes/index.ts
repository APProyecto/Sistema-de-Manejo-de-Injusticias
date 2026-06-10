import { Router } from "express";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import trackingRouter from "../modules/tracking/tracking.routes";

const router = Router();

router.get("/", (_req, res) => {
    res.json({ 
        ok: true, 
        message: "M4 Statistics API root" 
    });
});


router.use("/analytics", analyticsRoutes);
router.use("/tracking", trackingRouter);

export default router;