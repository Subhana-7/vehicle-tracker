export type TripSummary = {
  id: string;
  distance: number;
  idling: number;
  stoppage: number;
  points: number;
  createdAt?: string;
};

export type TripsResponse = {
  trips: TripSummary[];
};

export type TripRoutePoint = {
  latitude: number;
  longitude: number;
  timestamp: string;
  ignition: "on" | "off";
  speed: number;
};

export type TripDetails = {
  id: string;
  name: string;
  summary: {
    distance: number;
    duration: number;
    idling: number;
    stoppage: number;
    points: number;
  };
  route: TripRoutePoint[];
};