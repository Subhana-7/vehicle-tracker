import { GPSData } from "./trip.dto";

export interface TripSummaryDTO {
  distance: number;
  duration: number;
  idling: number;
  stoppage: number;
  points: number;
}

export interface TripAnalysisDTO {
  id: string;
  name: string;
  summary: TripSummaryDTO;
  route: GPSData[];
  createdAt: Date;
}

export interface TripListItemDTO {
  id: string;
  name: string;
  distance: number;
  idling: number;
  stoppage: number;
  points: number;
  createdAt: Date;
}

export interface TripListResponseDTO {
  trips: TripListItemDTO[];
}