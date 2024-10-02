import { z } from "zod";

export const orderItemSchema = z.object({
  orderId: z.string().uuid(),
  inventoryId: z.string().uuid(),
  quantity: z.number().int().gt(0).positive(),
  price: z.number().gt(0).positive(),
});
export type CreateOrderItem = z.infer<typeof orderItemSchema>;

export const updateOrderItemSchema = orderItemSchema
  .omit({ orderId: true, inventoryId: true })
  .partial();
export type UpdateOrderItem = z.infer<typeof updateOrderItemSchema>;
