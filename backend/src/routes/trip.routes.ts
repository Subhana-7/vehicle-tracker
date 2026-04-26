import express from "express";
import multer from "multer";
import container from "../config/inversify.config";
import { ITripController } from "../controller/interface/ITripController";
import { TYPES } from "../types";
import { verifyAccessToken } from "../middleware/auth.middleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const controller = container.get<ITripController>(TYPES.ITripController);

router.post(
  "/upload",
  verifyAccessToken,
  upload.single("data"),
  controller.uploadTrip.bind(controller),
);

router.get("/trip/:id",verifyAccessToken, controller.getTrip.bind(controller));

router.get("/trips",verifyAccessToken,controller.getAllTrips.bind(controller));

router.delete(
  "/trips",
  verifyAccessToken,
  controller.deleteTrips.bind(controller)
);

export default router;
