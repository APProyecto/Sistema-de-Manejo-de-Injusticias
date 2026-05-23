import { Router } from "express";
import { countUsers, listUsers, loginUser, registerUser } from "./users.controller";

const router = Router();

router.get("/count", countUsers);
router.get("/listUsers", listUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;