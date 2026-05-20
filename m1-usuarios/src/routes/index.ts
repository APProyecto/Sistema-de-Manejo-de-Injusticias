import { Router } from "express";
import usersRoutes from "../modules/users/users.routes";
import fileRoutes from "../modules/files/files.routes";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M1 Usuarios API root",
  });
});

router.use("/users", usersRoutes);

router.use("/files", fileRoutes);
export default router;