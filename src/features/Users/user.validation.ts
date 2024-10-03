import { object, string, z } from "zod";

export const userSchema = object({
  name: string(),
  email: string().email(),
  password: string(),
});

export type CreateUser = z.infer<typeof userSchema>;
