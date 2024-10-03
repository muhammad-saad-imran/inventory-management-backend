import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateProduct = z.infer<typeof productSchema>;
