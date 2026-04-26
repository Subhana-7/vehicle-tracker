import {
  TripAnalysisDTO,
  TripListResponseDTO,
} from "../../dtos/trip-response.dto";
import { TripDocument } from "../../models/trip.model";

export interface ITripService {
  createTripFromFile(
    userId: string,
    filePath: string,
    name?: string,
  ): Promise<TripDocument>;

  getTripAnalysis(tripId: string, userId: string): Promise<TripAnalysisDTO>;

  getAllTrips(userId: string): Promise<TripListResponseDTO>;

  deleteTrips(userId: string, ids: string[]): Promise<{ deletedCount: number }>;
}
