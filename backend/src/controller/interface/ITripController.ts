import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";

export interface ITripController {
  uploadTrip(req: AuthRequest, res: Response): Promise<void>;
  getTrip(req: AuthRequest, res: Response): Promise<void>;
  getAllTrips(req:AuthRequest,res:Response):Promise<void>;
  deleteTrips(req: AuthRequest, res: Response):Promise<void>
}
