import geolib from "geolib";
import { GPSData } from "../dtos/trip.dto";

export class TripAnalysisService {
  calculateTrip(data: GPSData[]) {
    let totalDistance = 0;

    for (let i = 1; i < data.length; i++) {
      const prev = data[i - 1];
      const curr = data[i];

      const distance = geolib.getDistance(
        { latitude: prev.latitude, longitude: prev.longitude },
        { latitude: curr.latitude, longitude: curr.longitude }
      );

      totalDistance += distance;

      const timeDiff =
        (new Date(curr.timestamp).getTime() -
          new Date(prev.timestamp).getTime()) /
        1000;

      if (timeDiff > 0) {
        const speed = distance / timeDiff;
        curr.speed = speed * 3.6;
      }
    }

    return { totalDistance, data };
  }

  analyzeTrip(data: GPSData[]) {
    let idlingTime = 0;
    let stoppageTime = 0;

    for (let i = 1; i < data.length; i++) {
      const prev = data[i - 1];
      const curr = data[i];

      const timeDiff =
        (new Date(curr.timestamp).getTime() -
          new Date(prev.timestamp).getTime()) /
        1000;

      if (curr.ignition === "OFF") {
        stoppageTime += timeDiff;
      } else if (curr.speed === 0) {
        idlingTime += timeDiff;
      }
    }

    return { idlingTime, stoppageTime };
  }
}