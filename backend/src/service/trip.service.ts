import { TripAnalysisService } from "./trip-analysis.service";
import { GPSData } from "../dtos/trip.dto";
import fs from "fs";
import csv from "csv-parser";
import { ITripRepository } from "../repository/interfaces/ITripRepository";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ITripService } from "./interfaces/ITripService";

@injectable()
export class TripService implements ITripService {
  constructor(
    @inject(TYPES.ITripRepository) private _tripRepo: ITripRepository,
    @inject(TYPES.ITripAnalysisService)
    private _analysisService: TripAnalysisService,
  ) {}

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
            const trip = await this._tripRepo.create({ userId, data: results });
            resolve(trip);
          } catch (err) {
            reject(err);
          }
        })
        .on("error", reject);
    });
  }

  async getTripAnalysis(id: string) {
    const trip = await this._tripRepo.findById(id);
    if (!trip) throw new Error("Trip not found");

    const plainTrip = trip.toObject();

    const calc = this._analysisService.calculateTrip(plainTrip.data);
    const analysis = this._analysisService.analyzeTrip(calc.data);

    return {
      distance: calc.totalDistance,
      idling: analysis.idlingTime,
      stoppage: analysis.stoppageTime,
      data: calc.data,
    };
  }
}
