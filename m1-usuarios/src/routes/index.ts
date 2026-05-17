import { Router } from "express";
import usersRoutes from "../modules/users/users.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M1 Usuarios API root",
  });
});

router.use("/users", usersRoutes);

export default router;