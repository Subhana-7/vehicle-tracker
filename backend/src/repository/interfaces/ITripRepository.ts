import { GPSData } from "../../dtos/trip.dto";
import { TripDocument } from "../../models/trip.model";

export interface ITripRepository {
  findByUserId(userId: string): Promise<TripDocument[]>;
  create(data: Partial<any>): Promise<any>
  findById(id: string): Promise<any | null>
}