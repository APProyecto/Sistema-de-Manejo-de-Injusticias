import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M1 Usuarios API root",
  });
});


export default router;