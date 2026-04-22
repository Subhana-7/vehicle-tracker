import axios, { AxiosError } from "axios";
import type { UploadError, UploadResponse } from "../types/upload";
import type { TripDetails, TripsResponse } from "../types/trip";

const API = import.meta.env.VITE_SERVER_URL;


export const getTripById = async (id:string):Promise<TripDetails> => {
  const res = await axios.get<TripDetails>(`${API}/api/trip/${id}`); 
  console.log(res.data)

  return res.data
};

export const getAllTrips = async () => {
  const res = await axios.get<TripsResponse>(`${API}/api/trips`);

  const trips = res.data.trips; 
  console.log('service1',trips)

  return trips.map((trip: any) => ({
    id: trip.id,
    name: `Trip - ${trip.distance}m`,
  }));
};


export const uploadTripFile = async (
  file: File
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("data", file); 

  try {
    const res = await axios.post<UploadResponse>(
      `${API}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data)
    return res.data;
  } catch (error) {
    const err = error as AxiosError<UploadError>;
    throw new Error(err.response?.data?.message || "Upload failed");
  }
};