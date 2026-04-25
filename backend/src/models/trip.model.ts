import mongoose, { Schema, Document } from "mongoose";
import { GPSData, GPSSchema } from "./gps.schema";

export interface TripDocument extends Document {
  userId: string;
  name?: string;
  data: GPSData[];
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new Schema<TripDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: false },
    data: { type: [GPSSchema], required: true },
  },
  {
    timestamps: true,
  },
);

export const TripModel = mongoose.model<TripDocument>("Trip", tripSchema);
