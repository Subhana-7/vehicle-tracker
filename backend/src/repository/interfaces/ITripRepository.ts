import { GPSData } from "../../dtos/trip.dto";

export interface ITripRepository {
  create(data: { userId: string; data: GPSData[] }): Promise<any>;
  findById(id: string): Promise<any | null>;
  getAll():Promise<any | null>;
}
