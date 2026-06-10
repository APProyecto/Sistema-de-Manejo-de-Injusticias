import {Router} from "express";
import {
    getMostFollowedCases,
    getUserPostAndComments
} from "./tracking.controllers";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M4 Stadistics tracking root",
  });
});

router.get("/getFollowers",getMostFollowedCases);
router.get("/getUserHistory", getUserPostAndComments)

export default router;