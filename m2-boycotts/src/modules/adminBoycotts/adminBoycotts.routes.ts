import { Router } from "express";
import {
  addAdminFavoriteHandler,
  createAdminBoycottHandler,
  getAdminBoycottAttachments,
  getAdminBoycottDetailHandler,
  getAdminBoycotts,
  getAdminFavorites,
  getAdminMyBoycotts,
  removeAdminFavoriteHandler,
  updateAdminBoycottStatePlaceholder,
} from "./adminBoycotts.controller";

const router = Router();

router.get("/", getAdminBoycotts);
router.get("/my", getAdminMyBoycotts);
router.get("/favorites", getAdminFavorites);
router.get("/:id", getAdminBoycottDetailHandler);
router.get("/:id/attachments", getAdminBoycottAttachments);
router.post("/", createAdminBoycottHandler);
router.post("/:id/favorites", addAdminFavoriteHandler);
router.delete("/:id/favorites", removeAdminFavoriteHandler);
router.patch("/:id/state", updateAdminBoycottStatePlaceholder);

export default router;
