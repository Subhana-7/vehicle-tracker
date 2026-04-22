import { GPSData } from "../../dtos/trip.dto";
import { TripDocument } from "../../models/trip.model";

export interface ITripRepository {
  create(data: { userId: string; data: GPSData[] }): Promise<any>;
  findById(id: string): Promise<any | null>;
  getAll():Promise<any | null>;
  findByUserId(userId: string): Promise<TripDocument[]>;
}
