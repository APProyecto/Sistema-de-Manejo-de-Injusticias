import { Router } from "express";
import adminBoycottRoutes from "../modules/adminBoycotts/adminBoycotts.routes";
import boycottRoutes from "../modules/boycotts/boycott.routes";
import entityRoutes from "../modules/entities/entity.routes";
import attachmentRoutes from "../modules/attachments/attachment.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ ok: true, message: "M2 Boycotts API" });
});

router.use("/admin/boycotts", adminBoycottRoutes);
router.use("/boycotts", boycottRoutes);
router.use("/entities", entityRoutes);
router.use("/boycotts/:boycottId/attachments", attachmentRoutes);

export default router;