import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import Order from "./Order";
import Inventory from "./Inventory";
import sequelize from "..";

class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  orderId!: ForeignKey<Order["id"]>;
  inventoryId!: ForeignKey<Inventory["id"]>;
  quantity!: number;
  price!: number;
  createdAt!: Date;
  updatedAt!: Date;

  /** Association attributes */
  order!: NonAttribute<Order>;
  inventory!: NonAttribute<Inventory>;
}

/**
 * Initialize OrderItem Model
 */
OrderItem.init(
  {
    orderId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    inventoryId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
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
    tableName: "orderItems",
    timestamps: true,
  }
);

/**
 * Define OrderItem associations
 */
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Inventory);

export default OrderItem;
