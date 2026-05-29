import { Router } from "express";
import adminBoycottRoutes from "../modules/adminBoycotts/adminBoycotts.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ ok: true, message: "M2 Boycotts API" });
});

router.use("/admin/boycotts", adminBoycottRoutes);

export default router;