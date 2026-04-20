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

    const totalDuration =
      (new Date(plainTrip.data[plainTrip.data.length - 1].timestamp).getTime() -
        new Date(plainTrip.data[0].timestamp).getTime()) /
      1000;

    return {
      id: plainTrip._id.toString(),
      name: plainTrip.name ?? "Trip",

      summary: {
        distance: calc.totalDistance,
        duration: totalDuration,
        idling: analysis.idlingTime,
        stoppage: analysis.stoppageTime,
        points: plainTrip.data.length,
      },

      route: calc.data, 

      createdAt: plainTrip.createdAt,
    };
  }

  async getAllTrips() {
    const trips = await this._tripRepo.getAll();

    if (!trips || trips.length === 0) {
      return { trips: [] };
    }

    const formattedTrips = trips.map((trip: any) => {
      const plain = trip.toObject();

      const calc = this._analysisService.calculateTrip(plain.data);
      const analysis = this._analysisService.analyzeTrip(calc.data);

      return {
        id: plain._id.toString(),
        distance: calc.totalDistance,
        idling: analysis.idlingTime,
        stoppage: analysis.stoppageTime,
        points: plain.data.length,
        createdAt: plain.createdAt,
      };
    });

    return {
      trips: formattedTrips,
    };
  }
}
