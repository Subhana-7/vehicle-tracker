import { Request, Response } from "express";
import { ITripService } from "../service/interfaces/ITripService";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ITripController } from "./interface/ITripController";
import { AuthRequest } from "../middleware/auth.middleware";

import { validate } from "../utils/validation.util";
import {
  tripIdParamSchema,
  uploadTripBodySchema,
  deleteTripsSchema
} from "../validations/trip.validation";
import { TRIP_MESSAGES } from "../constants/error-messages";

@injectable()
export class TripController implements ITripController {
  constructor(
    @inject(TYPES.ITripService) private _tripService: ITripService
  ) {}

  async uploadTrip(req: AuthRequest, res: Response) {
    if (!req.file) {
      throw new Error("File is required");
    }

    const body = validate(uploadTripBodySchema, req.body);

    const userId = req.user!.id;

    const trip = await this._tripService.createTripFromFile(
      userId,
      req.file.path,
      body.name 
    );

    res.json(trip);
  }

  async getTrip(req: AuthRequest, res: Response) {
    const params = validate(tripIdParamSchema, req.params);

    const userId = req.user!.id;

    const result = await this._tripService.getTripAnalysis(
      params.id,
      userId
    );

    res.json(result);
  }

  async getAllTrips(req: AuthRequest, res: Response) {
    const userId = req.user!.id;

    const result = await this._tripService.getAllTrips(userId);

    res.json(result);
  }

  async deleteTrips(req: AuthRequest, res: Response) {
  const body = validate(deleteTripsSchema, req.body);

  const userId = req.user!.id;

  const result = await this._tripService.deleteTrips(
    userId,
    body.ids
  );

  res.json({
    message: TRIP_MESSAGES.DELETE_SUCCESS,
    ...result,
  });
}
}