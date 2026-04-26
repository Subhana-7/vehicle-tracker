import fs from "fs";
import csv from "csv-parser";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ITripService } from "./interfaces/ITripService";
import { ITripAnalysisService } from "./interfaces/ITripAnalysisService";
import { ITripRepository } from "../repository/interfaces/ITripRepository";
import { TripMapper } from "../mapper/trip.mapper";
import {
  TripAnalysisDTO,
  TripListResponseDTO,
} from "../dtos/trip-response.dto";
import { TripDocument } from "../models/trip.model";
import { GPSData } from "../dtos/trip.dto";
import { AppError } from "../utils/AppError";
import { TRIP_MESSAGES } from "../constants/error-messages";
import { STATUS_CODES } from "../constants/status-codes";

@injectable()
export class TripService implements ITripService {
  constructor(
    @inject(TYPES.ITripRepository) private _tripRepo: ITripRepository,
    @inject(TYPES.ITripAnalysisService)
    private _analysisService: ITripAnalysisService,
  ) {}

  async createTripFromFile(
    userId: string,
    filePath: string,
    name?: string,
  ): Promise<TripDocument> {
    if (!userId)
      throw new AppError(
        TRIP_MESSAGES.UNAUTHENTICATED,
        STATUS_CODES.UNAUTHORIZED,
      );

    if (!filePath || !fs.existsSync(filePath)) {
      throw new AppError(
        TRIP_MESSAGES.FILE_NOT_FOUND,
        STATUS_CODES.BAD_REQUEST,
      );
    }

    const results: GPSData[] = [];

    return new Promise<TripDocument>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          try {
            const latitude = parseFloat(row.latitude);
            const longitude = parseFloat(row.longitude);
            const timestamp = row.timestamp;
            const ignition = row.ignition?.trim().toUpperCase();

            if (
              Number.isNaN(latitude) ||
              Number.isNaN(longitude) ||
              !timestamp ||
              (ignition !== "ON" && ignition !== "OFF")
            ) {
              return;
            }

            results.push({
              latitude,
              longitude,
              timestamp,
              ignition,
              speed: 0,
            });
          } catch {
            // skip malformed row
          }
        })
        .on("end", async () => {
          try {
            if (results.length < 2) {
              throw new AppError(
                TRIP_MESSAGES.INSUFFICIENT_POINTS,
                STATUS_CODES.UNPROCESSABLE_ENTITY,
              );
            }

            const safeName =
              name && name.trim().length > 0 ? name.trim() : "Trip";

            const trip = await this._tripRepo.create({
              userId,
              name: safeName,
              data: results,
            });

            resolve(trip);
          } catch (err) {
            reject(err);
          }
        })
        .on("error", () =>
          reject(
            new AppError(
              TRIP_MESSAGES.CSV_READ_ERROR,
              STATUS_CODES.BAD_REQUEST,
            ),
          ),
        );
    });
  }

  async getTripAnalysis(
    tripId: string,
    userId: string,
  ): Promise<TripAnalysisDTO> {
    if (!tripId)
      throw new AppError(
        TRIP_MESSAGES.TRIP_ID_REQUIRED,
        STATUS_CODES.BAD_REQUEST,
      );

    const trip = await this._tripRepo.findById(tripId);
    if (!trip)
      throw new AppError(TRIP_MESSAGES.TRIP_NOT_FOUND, STATUS_CODES.NOT_FOUND);

    if (trip.userId !== userId) {
      throw new AppError(TRIP_MESSAGES.UNAUTHORIZED, STATUS_CODES.FORBIDDEN);
    }

    const plain = trip.toObject();

    if (!plain.data || plain.data.length < 2) {
      throw new AppError(
        TRIP_MESSAGES.INSUFFICIENT_DATA,
        STATUS_CODES.UNPROCESSABLE_ENTITY,
      );
    }

    const calc = this._analysisService.calculateTrip(plain.data);
    const analysis = this._analysisService.analyzeTrip(calc.data);

    return TripMapper.toAnalysisDTO(trip, calc, analysis);
  }

  async getAllTrips(userId: string): Promise<TripListResponseDTO> {
    if (!userId)
      throw new AppError(
        TRIP_MESSAGES.UNAUTHENTICATED,
        STATUS_CODES.UNAUTHORIZED,
      );

    const trips = await this._tripRepo.findByUserId(userId);

    if (!trips || trips.length === 0) {
      return { trips: [] };
    }

    const formattedTrips = trips.map((trip) => {
      const plain = trip.toObject();

      if (!plain.data || plain.data.length < 2) {
        return null;
      }

      const calc = this._analysisService.calculateTrip(plain.data);
      const analysis = this._analysisService.analyzeTrip(calc.data);

      return TripMapper.toListItemDTO(trip, calc, analysis);
    });

    return {
      trips: formattedTrips.filter(Boolean) as any,
    };
  }

async deleteTrips(userId: string, tripIds: string[]): Promise<{ deletedCount: number }> {

  if (!userId) {
    throw new AppError(
      TRIP_MESSAGES.UNAUTHENTICATED,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  if (!tripIds || tripIds.length === 0) {
    throw new AppError(
      TRIP_MESSAGES.DELETE_IDS_REQUIRED,
      STATUS_CODES.BAD_REQUEST
    );
  }

  const uniqueIds = [...new Set(tripIds)];

  const deletedCount = await this._tripRepo.deleteManyByIds(userId, uniqueIds);

  if (deletedCount === 0) {
    throw new AppError(
      TRIP_MESSAGES.TRIP_NOT_FOUND,
      STATUS_CODES.NOT_FOUND
    );
  }

  return { deletedCount };
}
}
