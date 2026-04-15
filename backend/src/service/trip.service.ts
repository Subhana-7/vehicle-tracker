import { TripRepository } from "../repository/trip.repository";
import { TripAnalysisService } from "./trip-analysis.service";
import { GPSData } from "../dtos/trip.dto";
import fs from "fs";
import csv from "csv-parser";

export class TripService {
  private tripRepo = new TripRepository();
  private analysisService = new TripAnalysisService();

  async createTripFromFile(userId: string, filePath: string) {
    const results: GPSData[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          results.push({
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            timestamp: data.timestamp,
            ignition: data.ignition?.trim().toUpperCase() as "ON" | "OFF",
            speed: 0,
          });
        })
        .on("end", async () => {
          try {
            const trip = await this.tripRepo.create({ userId, data: results });
            resolve(trip);
          } catch (err) {
            reject(err);
          }
        })
        .on("error", reject);
    });
  }

  async getTripAnalysis(id: string) {
    const trip = await this.tripRepo.findById(id);
    if (!trip) throw new Error("Trip not found");

    const plainTrip = trip.toObject();

    const calc = this.analysisService.calculateTrip(plainTrip.data);
    const analysis = this.analysisService.analyzeTrip(calc.data);

    return {
      distance: calc.totalDistance,
      idling: analysis.idlingTime,
      stoppage: analysis.stoppageTime,
      data: calc.data,
    };
  }
}
