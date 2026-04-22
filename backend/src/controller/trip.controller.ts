import { Request, Response } from "express";
import { ITripService } from "../service/interfaces/ITripService";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ITripController } from "./interface/ITripController";
import { AuthRequest } from "../middleware/auth.middleware";

@injectable()
export class TripController implements ITripController {
  constructor(@inject(TYPES.ITripService) private _tripService: ITripService) {}

  async uploadTrip(req: AuthRequest, res: Response) {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const userId = req.user!.id;

    const trip = await this._tripService.createTripFromFile(
      userId,
      req.file.path,
    );

    res.json(trip);
  }

  async getTrip(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const result = await this._tripService.getTripAnalysis(
      req.params.id as string,
      userId
    );
    res.json(result);
  }

  async getAllTrips(req:AuthRequest,res:Response){
    const userId = req.user!.id;
    const result = await this._tripService.getAllTrips(userId);
    res.json(result);
  }
}
