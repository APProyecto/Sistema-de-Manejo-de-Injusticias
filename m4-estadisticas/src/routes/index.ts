import { Router } from "express";
import auditsRoutes from "../modules/audits/audits.routes";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "API root",
  });
});

router.use("/audits", auditsRoutes);
export default router;
