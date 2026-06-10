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

//GET http://localhost:3004/api/tracking/getFollowers
router.get("/getFollowers", getMostFollowedCases);

//GET http://localhost:3004/api/tracking/getUserHistory
router.get("/getUserHistory", getUserPostAndComments);

//GET http://localhost:3004/api/tracking/getByEntity
router.get("/getByEntity", getByEntity);

export default router;
