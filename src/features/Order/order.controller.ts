import { Request, Response } from "express";
import BaseController from "../../abstractions/BaseController";
import Order from "../../database/models/Order";
import OrderService from "./order.service";
import { orderSchema, orderStatusSchema } from "./order.validation";
import { handleResponse } from "../../utils/route.utils";

export default class OrderController extends BaseController<Order> {
  constructor(private orderService: OrderService) {
    super(orderService, orderSchema);
  }

  override async update(req: Request, res: Response): Promise<void> {
    const updateOrderStatus = orderStatusSchema.parse(req.body);
    const updatedOrder = await this.orderService.update(req.params.id, updateOrderStatus);
    handleResponse(res, updatedOrder);
  }
}
