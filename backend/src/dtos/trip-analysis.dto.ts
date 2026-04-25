import { GPSData } from "./trip.dto";

export interface CalculatedGPSData extends GPSData {
  speed: number;
}

export interface TripCalculationResultDTO {
  totalDistance: number;
  data: CalculatedGPSData[];
}

export interface TripAnalysisResultDTO {
  idlingTime: number;
  stoppageTime: number;
}