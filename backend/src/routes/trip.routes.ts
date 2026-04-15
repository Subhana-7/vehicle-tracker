import express from "express";
import multer from "multer";
import { TripController } from "../controller/trip.controller";

const router = express.Router();
const controller = new TripController();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("data"), controller.uploadTrip);
router.get("/trip/:id", controller.getTrip);

export default router;