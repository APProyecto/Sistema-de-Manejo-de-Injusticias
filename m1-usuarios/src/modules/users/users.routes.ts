import { Router } from "express";
import { countUsers, listUsers, checkRol, convertUserToAdmin, convertAdminToUser } from "./users.controller";


const router = Router();

router.get("/count", countUsers);
router.get("/listUsers", listUsers);
router.post("/isAdmin", checkRol);
router.post("/toAdmin", convertUserToAdmin);
router.post("/toUser", convertAdminToUser);
export default router;