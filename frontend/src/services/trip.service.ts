import axios, { AxiosError } from "axios";
import type { UploadError, UploadResponse } from "../types/upload";
import type { TripDetails, TripsResponse } from "../types/trip";
import { TRIP_ROUTES } from "../constants/routes";

const API = import.meta.env.VITE_SERVER_URL;

export const getTripById = async (id: string): Promise<TripDetails> => {
  const res = await axios.get<TripDetails>(
    `${API}${TRIP_ROUTES.base}${TRIP_ROUTES.details}/${id}`,
    {
      withCredentials: true,
    },
  );

  return res.data;
};

export const getAllTrips = async () => {
  const res = await axios.get<TripsResponse>(
    `${API}${TRIP_ROUTES.base}${TRIP_ROUTES.trips}`,
    {
      withCredentials: true,
    },
  );

  const trips = res.data.trips;

  console.log(trips);

  return trips.map((trip: any) => ({
    id: trip.id,
    name: trip.name,
    createdAt: trip.createdAt,
  }));
};

export const uploadTripFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();

  formData.append("data", file);
  formData.append("data", file.name);

  try {
    const res = await axios.post<UploadResponse>(
      `${API}${TRIP_ROUTES.base}${TRIP_ROUTES.upload}`,
      formData,
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<UploadError>;
    throw new Error(err.response?.data?.message || "Upload failed");
  }
};

export const deleteTrips = async (ids: string[]) => {
  try {
    const res = await axios.delete(
      `${API}${TRIP_ROUTES.base}${TRIP_ROUTES.trips}`,
      {
        data: { ids },
        withCredentials: true,
      },
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || "Delete failed");
  }
};
