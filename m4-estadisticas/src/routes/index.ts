import { Router } from "express";
import auditsRoutes from "../modules/audits/audits.routes";
import trackingRoutes from "../modules/tracking/tracking.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M4 Estadisticas API root",
  });
});

router.use("/audits", auditsRoutes);
router.use("/tracking", trackingRoutes);

export default router;
