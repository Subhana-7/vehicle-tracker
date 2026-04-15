import { Request, Response } from "express";
import { TripService } from "../service/trip.service";

const tripService = new TripService();

export class TripController {
  async uploadTrip(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const trip = await tripService.createTripFromFile("user1", req.file.path);

    res.json(trip);
  }

  async getTrip(req: Request, res: Response) {
    const result = await tripService.getTripAnalysis(req.params.id as string);
    res.json(result);
  }
}
