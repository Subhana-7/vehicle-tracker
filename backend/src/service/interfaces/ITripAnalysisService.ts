import { GPSData } from "../../dtos/trip.dto";

export interface ITripAnalysisService {
  calculateTrip(data: GPSData[]): {
    totalDistance: number;
    data: GPSData[];
  };

  analyzeTrip(data: GPSData[]): {
    idlingTime: number;
    stoppageTime: number;
  };
}
