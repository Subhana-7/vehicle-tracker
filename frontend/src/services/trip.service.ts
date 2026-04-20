import axios, { AxiosError } from "axios";
import type { UploadError, UploadResponse } from "../types/upload";

const API = import.meta.env.VITE_SERVER_URL;


export const getTrips = async () => {
  const res = await axios.get(`${API}/api/trip/69da65d00c4c7ec9e0a42351`); 

  const trip = res.data;
  console.log(trip)

  return [
    {
      id: 1, 
      name: `Trip - ${trip.distance}m`, 
    },
  ];
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