import { TripDocument } from "../models/trip.model";
import { TripAnalysisDTO, TripListItemDTO } from "../dtos/trip-response.dto";

export class TripMapper {
  static toAnalysisDTO(
    trip: TripDocument,
    calc: any,
    analysis: any
  ): TripAnalysisDTO {
    const plain = trip.toObject();

    const totalDuration =
      (new Date(plain.data[plain.data.length - 1].timestamp).getTime() -
        new Date(plain.data[0].timestamp).getTime()) /
      1000;

    return {
      id: plain._id.toString(),
      name: plain.name ?? "Trip",
      summary: {
        distance: calc.totalDistance,
        duration: totalDuration,
        idling: analysis.idlingTime,
        stoppage: analysis.stoppageTime,
        points: plain.data.length,
      },
      route: calc.data,
      createdAt: plain.createdAt,
    };
  }

  static toListItemDTO(
    trip: TripDocument,
    calc: any,
    analysis: any
  ): TripListItemDTO {
    const plain = trip.toObject();

    return {
      id: plain._id.toString(),
      name: plain.name ?? "Trip",
      distance: calc.totalDistance,
      idling: analysis.idlingTime,
      stoppage: analysis.stoppageTime,
      points: plain.data.length,
      createdAt: plain.createdAt,
    };
  }
}