import express from "express";
import multer from "multer";
import container from "../config/inversify.config";
import { ITripController } from "../controller/interface/ITripController";
import { TYPES } from "../types";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const controller = container.get<ITripController>(TYPES.ITripController);

router.post(
  "/upload",
  upload.single("data"),
  controller.uploadTrip.bind(controller),
);

router.get("/trip/:id", controller.getTrip.bind(controller));

export default router;
