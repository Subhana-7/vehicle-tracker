import { Request, Response } from "express";
import { ITripService } from "../service/interfaces/ITripService";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ITripController } from "./interface/ITripController";

@injectable()
export class TripController implements ITripController {
  constructor(@inject(TYPES.ITripService) private _tripService: ITripService) {}

  async uploadTrip(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const trip = await this._tripService.createTripFromFile(
      "user1",
      req.file.path,
    );

    res.json(trip);
  }

  async getTrip(req: Request, res: Response) {
    console.log("frotend hit")
    const result = await this._tripService.getTripAnalysis(
      req.params.id as string,
    );
    res.json(result);
  }

  async getAllTrips(req:Request,res:Response){
    const result = await this._tripService.getAllTrips();
    res.json(result);
  }
}
