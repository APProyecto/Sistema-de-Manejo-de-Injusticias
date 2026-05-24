import { Router } from "express";
import { countUsers, listUsers, loginUser, registerUser, googleLogin } from "./users.controller";

const router = Router();

router.get("/count", countUsers);
router.get("/listUsers", listUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
export default router;