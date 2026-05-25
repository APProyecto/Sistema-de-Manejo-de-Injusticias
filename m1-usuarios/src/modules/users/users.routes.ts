import { Router } from "express";

import {
  countUsers,
  listUsers,
  checkRol,
  convertUserToAdmin,
  convertAdminToUser,
  existingEmail,
  getAppUserProfile,
  googleLogin,
  loginUser,
  registerUser,
  userHistory,
} from "./users.controller";

const router = Router();

router.get("/count", countUsers);
router.get("/listUsers", listUsers);

router.post("/isAdmin", checkRol);
router.post("/toAdmin", convertUserToAdmin);
router.post("/toUser", convertAdminToUser);

router.post("/register", registerUser);
router.get("/existingEmail", existingEmail);
router.get("/getProfile/:appUserId/profile", getAppUserProfile);
router.post("/login", loginUser);
router.get("/history", userHistory);
router.post("/google", googleLogin);

export default router;