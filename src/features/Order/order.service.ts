import { CreationAttributes, Attributes, Transaction } from "sequelize";
import BaseService from "../../abstractions/BaseService";
import Client from "../../database/models/Client";
import Order from "../../database/models/Order";
import NotFoundError from "../../Errors/NotFoundError";
import ClientService from "../Client/client.service";
import { UpdateOrderStatus } from "./order.validation";
import OrderItem from "../../database/models/OrderItem";
import Inventory from "../../database/models/Inventory";

export default class OrderService extends BaseService<Order> {
  constructor(private clientService: ClientService) {
    super(Order);
  }

  override async get(id: string): Promise<Order> {
    const order = await Order.findByPk(id, {
      include: [Client, { model: OrderItem, include: [Inventory] }],
    });
    if (order) {
      return order;
    } else {
      throw new NotFoundError("Order not found");
    }
  }

  override async create(
    newOrder: CreationAttributes<Order>,
    transaction?: Transaction
  ): Promise<Order> {
    const client = await this.clientService.get(newOrder.clientId);
    return super.create(newOrder, transaction);
  }

  override async update(
    id: string,
    updateOrderStatus: UpdateOrderStatus,
    transaction?: Transaction
  ): Promise<Order> {
    const { status } = updateOrderStatus;
    await Order.update({ status }, { where: { id }, transaction });
    return this.get(id);
  }
}
