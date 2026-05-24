import { Router } from "express";
import { countUsers, 
    existingEmail, listUsers, loginUser, 
    registerUser, getAppUserProfile, 
    userHistory } from "./users.controller";

const router = Router();

router.get("/count", countUsers);
router.get("/listUsers", listUsers);
router.post("/register", registerUser);
router.get("/existingEmail", existingEmail);


router.get("/getProfile/:appUserId/profile", getAppUserProfile);
router.post("/login", loginUser);

router.get("/history", userHistory);
export default router;