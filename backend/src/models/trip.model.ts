import mongoose, { Schema, Document } from "mongoose";
import { GPSData, GPSSchema } from "./gps.schema";

export interface TripDocument extends Document {
  userId: string;
  data: GPSData[];
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new Schema<TripDocument>(
  {
    userId: { type: String, required: true, index: true },
    data: { type: [GPSSchema], required: true },
  },
  {
    timestamps: true, 
  }
);

tripSchema.index({ userId: 1 });

export const TripModel = mongoose.model<TripDocument>("Trip", tripSchema);