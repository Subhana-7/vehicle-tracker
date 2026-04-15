import { Request, Response } from "express";

export interface ITripController {
  uploadTrip(req: Request, res: Response): Promise<any>;
  getTrip(req: Request, res: Response): Promise<any>;
}
