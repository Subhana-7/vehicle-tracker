import {
  TripCalculationResultDTO,
  TripAnalysisResultDTO,
  CalculatedGPSData,
} from "../../dtos/trip-analysis.dto";
import { GPSData } from "../../dtos/trip.dto";

export interface ITripAnalysisService {
  calculateTrip(data: GPSData[]): TripCalculationResultDTO;
  analyzeTrip(data: CalculatedGPSData[]): TripAnalysisResultDTO;
}