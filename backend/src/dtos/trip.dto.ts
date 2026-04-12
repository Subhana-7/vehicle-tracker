export interface GPSData {
  latitude: number;
  longitude: number;
  timestamp: string;
  ignition: "ON" | "OFF"; 
  speed?: number;
}