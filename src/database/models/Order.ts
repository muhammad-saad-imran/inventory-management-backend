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
import Customer from "./Customer";
import OrderDetail from "./OrderDetail";

class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  id!: string;
  customerId!: ForeignKey<Customer["id"]>;
  status!: string;
  orderDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  /** Association attributes */
  customer!: NonAttribute<Customer>;
  orderDetails!: NonAttribute<OrderDetail[]>;
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
Order.belongsTo(Customer);

Order.hasMany(OrderDetail, {
  foreignKey: "orderId",
});

export default Order;
