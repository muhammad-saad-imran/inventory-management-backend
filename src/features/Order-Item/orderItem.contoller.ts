import { Request, Response } from "express";
import sequelize from "../../database";
import BaseController from "../../abstractions/BaseController";
import OrderItem from "../../database/models/OrderItem";
import OrderItemService from "./orderItem.service";
import { orderItemSchema, updateOrderItemSchema } from "./orderItem.validation";
import { handleResponse } from "../../utils/route.utils";

export default class OrderItemController extends BaseController<OrderItem> {
  constructor(private orderItemService: OrderItemService) {
    super(orderItemService, orderItemSchema);
  }

  override async get(req: Request, res: Response): Promise<void> {
    const orderItems = await this.orderItemService.getAllByOrderId(
      req.params.orderId
    );
    handleResponse(res, orderItems);
  }

  override async create(req: Request, res: Response): Promise<void> {
    const createItem: any = this.schema.parse(req.body);
    const newItem = await sequelize.transaction((t) =>
      this.orderItemService.create(createItem, t)
    );
    handleResponse(res, newItem, 201);
  }

  override async update(req: Request, res: Response): Promise<void> {
    const values = updateOrderItemSchema.parse(req.body);
    const updatedEntity = await sequelize.transaction((t) =>
      this.orderItemService.updateItem(
        req.params.orderId,
        req.params.inventoryId,
        values,
        t
      )
    );
    handleResponse(res, updatedEntity);
  }

  override async delete(req: Request, res: Response): Promise<void> {
    await sequelize.transaction((t) =>
      this.orderItemService.deleteItem(
        req.params.orderId,
        req.params.inventoryId,
        t
      )
    );
    handleResponse(res);
  }
}
