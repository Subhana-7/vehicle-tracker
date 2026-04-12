import { Schema } from "mongoose";

export interface GPSData {
  latitude: number;
  longitude: number;
  timestamp: string;
  ignition: "ON" | "OFF";
  speed?: number;
}

export const GPSSchema = new Schema<GPSData>(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: String, required: true },
    ignition: { type: String, enum: ["ON", "OFF"], required: true },
    speed: { type: Number, default: 0 },
  },
  { _id: false }
);