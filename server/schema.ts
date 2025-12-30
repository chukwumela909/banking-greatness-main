import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .regex(
      /^\+?(\d{1,3})?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "Invalid phone number format"
    )
    .optional(),
  dob: z
    .string()
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }, "You must be at least 18 years old")
    .optional(),
});

export const signUpSchemaFull = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .regex(
      /^\+?(\d{1,3})?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "Invalid phone number format"
    )
    .optional(),
  dob: z
    .string()
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }, "You must be at least 18 years old")
    .optional(),
  motherMaidenName: z
    .string()
    .min(1, "Mother's maiden name is required.")
    .optional(),
  ssn: z.string().min(9, "Invalid ssn, check again").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .optional(),
  accountType: z
    .string()
    .refine(
      (value) => ["savings", "checking"].includes(value),
      "Invalid account type"
    )
    .optional(),
});

// Infer the types from the schema
export type SignUpFormData = z.infer<typeof signUpSchemaFull>;
