import { BaseRepository } from "./base.repository";
import { TripDocument, TripModel } from "../models/trip.model";

export class TripRepository extends BaseRepository<TripDocument> {
  constructor() {
    super(TripModel);
  }
}