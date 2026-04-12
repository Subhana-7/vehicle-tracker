import express from "express";
import { TripController } from "../controller/trip.controller";

const router = express.Router();
const controller = new TripController();

router.post("/upload", controller.uploadTrip);
router.get("/trip/:id", controller.getTrip);

export default router;