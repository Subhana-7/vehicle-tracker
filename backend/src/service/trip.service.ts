import { TripRepository } from "../repository/trip.repository";
import { TripAnalysisService } from "./trip-analysis.service";
import { GPSData } from "../dtos/trip.dto";

export class TripService {
  private tripRepo = new TripRepository();
  private analysisService = new TripAnalysisService();

  async createTrip(userId: string, data: GPSData[]) {
    return this.tripRepo.create({ userId, data });
  }

  async getTripAnalysis(id: string) {
    const trip = await this.tripRepo.findById(id);
    if (!trip) throw new Error("Trip not found");

    const calc = this.analysisService.calculateTrip(trip.data);
    const analysis = this.analysisService.analyzeTrip(calc.data);

    return {
      distance: calc.totalDistance,
      idling: analysis.idlingTime,
      stoppage: analysis.stoppageTime,
      data: calc.data,
    };
  }
}