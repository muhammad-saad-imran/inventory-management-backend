import { CreationAttributes, Transaction } from "sequelize";
import BaseService from "../../abstractions/BaseService";
import Inventory from "../../database/models/Inventory";
import Order from "../../database/models/Order";
import OrderItem from "../../database/models/OrderItem";
import OrderService from "../Order/order.service";
import InventoryService from "../Inventory/inventory.service";
import { UpdateOrderItem } from "./orderItem.validation";
import sequelize from "../../database";
import BadRequestError from "../../Errors/BadRequestError";

export default class OrderItemService extends BaseService<OrderItem> {
  constructor(
    private orderService: OrderService,
    private inventoryService: InventoryService
  ) {
    super(OrderItem);
  }

  async getItem(orderId: string, inventoryId: string): Promise<OrderItem> {
    const orderItem = await OrderItem.findOne({
      where: { orderId, inventoryId },
    });
    if (orderItem) {
      return orderItem;
    } else {
      throw new BadRequestError("Order Item not found");
    }
  }

  async getAllByOrderId(orderId: string): Promise<OrderItem[]> {
    return OrderItem.findAll({
      where: { orderId },
      include: [Inventory],
    });
  }

  async create(
    newItem: CreationAttributes<OrderItem>,
    transaction?: Transaction
  ): Promise<OrderItem> {
    await this.orderService.get(newItem.orderId);
    await this.inventoryService.updateStock(
      newItem.inventoryId,
      { change: 0 - newItem.quantity },
      transaction
    );
    return super.create(newItem, transaction);
  }

  async updateItem(
    orderId: string,
    inventoryId: string,
    updateValues: UpdateOrderItem,
    transaction?: Transaction
  ): Promise<OrderItem> {
    const orderItem = await this.getItem(orderId, inventoryId);
    if (updateValues.quantity) {
      const quantityChange = orderItem.quantity - updateValues.quantity;
      await this.inventoryService.updateStock(
        orderItem.inventoryId,
        { change: quantityChange },
        transaction
      );
    }
    await OrderItem.update(updateValues, { where: { orderId, inventoryId } });
    return this.getItem(orderId, inventoryId);
  }

  async deleteItem(
    orderId: string,
    inventoryId: string,
    transaction?: Transaction
  ): Promise<OrderItem> {
    const orderItem = await this.getItem(orderId, inventoryId);
    await this.inventoryService.updateStock(
      orderItem.inventoryId,
      { change: orderItem.quantity },
      transaction
    );
    OrderItem.destroy({ where: { orderId, inventoryId } });
    return orderItem;
  }
}
