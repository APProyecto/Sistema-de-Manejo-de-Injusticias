import { Router } from "express";
import {
  getMostFollowedCases,
  getUserPostAndComments,
  getByEntity,
} from "./tracking.controllers";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M4 Stadistics tracking root",
  });
});

router.get("/getFollowers", getMostFollowedCases);
router.get("/getUserHistory", getUserPostAndComments);
router.get("/getByEntity", getByEntity);

export default router;
