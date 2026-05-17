import { Router } from "express";
import { countUsers, listUsers } from "./users.controller";

const router = Router();

router.get("/count", countUsers);
router.get("/listUsers", listUsers);

export default router;