import { z } from "zod";
import { ORDER_STATUS } from "./type";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const orderSchema = z.object({
  clientId: z.string().uuid(),
  status: z.nativeEnum(ORDER_STATUS).default(ORDER_STATUS.PENDING),
  orderDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "supplyDate should be a valid timestamp"
    )
    .refine((val) => new Date(val) >= today, "supplyDate cannot be in the past")
    .transform((val) => new Date(val)),
});

export const orderStatusSchema = z.object({
  status: z.nativeEnum(ORDER_STATUS),
});
export type UpdateOrderStatus = z.infer<typeof orderStatusSchema>;
