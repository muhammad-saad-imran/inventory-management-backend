import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  UUIDV4,
} from "sequelize";
import sequelize from "..";
import Client from "./Client";
import OrderItem from "./OrderItem";

class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  id!: string;
  clientId!: ForeignKey<Client["id"]>;
  status!: string;
  orderDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  /** Association attributes */
  client!: NonAttribute<Client>;
  orderItems!: NonAttribute<OrderItem[]>;
}

/**
 * Initialize Order model
 */
Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "order",
    timestamps: true,
  }
);

/**
 * Define Order associations
 */
Client.hasMany(Order, {
  foreignKey: "clientId",
  // as: "order_client",
});
Order.belongsTo(Client, {
  foreignKey: "clientId",
  // as: "order_client",
});

export default Order;
// 