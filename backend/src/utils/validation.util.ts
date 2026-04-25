import { ZodSchema } from "zod";

export const validate = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map((e) => e.message);
    throw new Error(errors.join(", "));
  }

  return result.data;
};