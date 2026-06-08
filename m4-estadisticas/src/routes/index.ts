import { Router } from "express";
import dashboardRoutes from "../modules/metrics/dashboard.routes";

const router = Router();

router.get("/", (_req, res) => {
    res.json({ 
        ok: true, 
        message: "API root" 
    });
});

router.use("/metrics", dashboardRoutes);
export default router;