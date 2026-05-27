import { Router } from "express";
import boycottRoutes from "../modules/boycotts/boycott.routes";
import attachmentRoutes from "../modules/attachments/attachment.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ ok: true, message: "M2 Boycotts API" });
});



router.use("/boycotts", boycottRoutes);


router.use("/boycotts/:boycottId/attachments", attachmentRoutes);

export default router;