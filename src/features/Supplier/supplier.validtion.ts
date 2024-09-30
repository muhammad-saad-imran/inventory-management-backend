import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string(),
  email: z.string().email("Enter valid email"),
  phoneNumber: z.string().regex(/^03[0-9]{9}$/, "Enter valid phone number"),
});
