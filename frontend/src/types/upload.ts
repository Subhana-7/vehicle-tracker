export type UploadResponse = {
  userId: string;
  data: Array<{
    latitude: number;
    longitude: number;
    timestamp: string;
    ignition: "ON" | "OFF";
    speed: number;
  }>;
};

export type UploadError = {
  message: string;
};