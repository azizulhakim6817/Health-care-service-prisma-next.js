import { z } from "zod";

const createPatientValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long!"),
  patient: z.object({
    name: z.string().nonempty("Name is required!"),
    email: z.string().email("Invalid email format!"),
    address: z.string().optional(),
  }),
});

export const UserValidation = { createPatientValidationSchema };
