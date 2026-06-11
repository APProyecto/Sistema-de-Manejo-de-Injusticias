import { Router } from "express";

import dashboardRoutes from "../modules/metrics/dashboard.routes";
import trackingRouter from "../modules/tracking/tracking.routes";
import auditsRoutes from "../modules/audits/audits.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M4 Stadistics API root",
  });
});

router.use("/metrics", dashboardRoutes);
router.use("/tracking", trackingRouter);
router.use("/audits", auditsRoutes);

export default router;
