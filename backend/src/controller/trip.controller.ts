import { Request, Response } from "express";
import { TripService } from "../service/trip.service";

const tripService = new TripService();

export class TripController {
  async uploadTrip(req: Request, res: Response) {
    const data = req.body.data;
    const trip = await tripService.createTrip("user1", data);

    res.json(trip);
  }

  async getTrip(req: Request, res: Response) {
    const result = await tripService.getTripAnalysis(req.params.id as string);
    res.json(result);
  }
}