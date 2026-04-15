import { BaseRepository } from "./base.repository";
import { TripDocument, TripModel } from "../models/trip.model";
import { ITripRepository } from "./interfaces/ITripRepository";

export class TripRepository
  extends BaseRepository<TripDocument>
  implements ITripRepository
{
  constructor() {
    super(TripModel);
  }
}
