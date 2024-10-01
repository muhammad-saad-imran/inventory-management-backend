import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const inventorySchema = z.object({
  supplierId: z.string().uuid(),
  productId: z.string().uuid(),
  cost: z.number(),
  supplyDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "supplyDate should be a valid timestamp"
    )
    .refine((val) => new Date(val) >= today, "supplyDate cannot be in the past")
    .transform((val) => new Date(val)),
  stock: z.number(),
});

export const changeStockSchema = z.object({
  change: z.number().refine((val) => val !== 0, "Change in stock cannot be 0"),
});
export type UpdateStock = z.infer<typeof changeStockSchema>;
