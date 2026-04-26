import { z } from "zod";

export const tripIdParamSchema = z.object({
  id: z.string().min(1, "Trip ID is required"),
});

export const uploadTripBodySchema = z.object({
  name: z.string().min(1).optional(), 
});

export const deleteTripsSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, "At least one trip id required"),
});