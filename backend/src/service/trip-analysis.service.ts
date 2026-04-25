import { GPSData } from "../dtos/trip.dto";
import { getDistance } from "geolib";
import {
  TripCalculationResultDTO,
  TripAnalysisResultDTO,
  CalculatedGPSData,
} from "../dtos/trip-analysis.dto";
import { AppError } from "../utils/AppError";
import { TRIP_MESSAGES } from "../constants/error-messages";
import { STATUS_CODES } from "../constants/status-codes";

export class TripAnalysisService {
  calculateTrip(data: GPSData[]): TripCalculationResultDTO {
    if (!data || data.length < 2) {
      throw new AppError(TRIP_MESSAGES.INSUFFICIENT_DATA_FOR_CALCULATION,STATUS_CODES.UNPROCESSABLE_ENTITY);
    }

    let totalDistance = 0;

    const calculatedData: CalculatedGPSData[] = data.map((p) => ({
      ...p,
      speed: 0,
    }));

    for (let i = 1; i < calculatedData.length; i++) {
      const prev = calculatedData[i - 1];
      const curr = calculatedData[i];

      const distance = getDistance(
        { latitude: prev.latitude, longitude: prev.longitude },
        { latitude: curr.latitude, longitude: curr.longitude }
      );

      if (!Number.isFinite(distance)) continue;

      totalDistance += distance;

      const timeDiff =
        (new Date(curr.timestamp).getTime() -
          new Date(prev.timestamp).getTime()) /
        1000;

      if (timeDiff > 0) {
        const speed = distance / timeDiff;
        curr.speed = Math.max(0, speed * 3.6);
      }
    }

    return { totalDistance, data: calculatedData };
  }

  analyzeTrip(data: CalculatedGPSData[]): TripAnalysisResultDTO {
    if (!data || data.length < 2) {
      return { idlingTime: 0, stoppageTime: 0 };
    }

    let idlingTime = 0;
    let stoppageTime = 0;

    for (let i = 1; i < data.length; i++) {
      const prev = data[i - 1];
      const curr = data[i];

      const timeDiff =
        (new Date(curr.timestamp).getTime() -
          new Date(prev.timestamp).getTime()) /
        1000;

      if (timeDiff <= 0) continue;

      if (curr.ignition === "OFF") {
        stoppageTime += timeDiff;
      } else if (curr.speed === 0) {
        idlingTime += timeDiff;
      }
    }

    return { idlingTime, stoppageTime };
  }
}