import { Router } from "express";
import moduleRoutes from "../modules/example/example.routes";
const router = Router();

router.get("/", (_req, res) => {
    res.json({ 
        ok: true, 
        message: "API root" 
    });
});

router.use("/example", moduleRoutes);
export default router;