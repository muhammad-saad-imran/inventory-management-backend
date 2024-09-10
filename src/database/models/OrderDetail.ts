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

class OrderDetail extends Model<
  InferAttributes<OrderDetail>,
  InferCreationAttributes<OrderDetail>
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
 * Initialize OrderDetail Model
 */
OrderDetail.init(
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
    tableName: "orderDetail",
    timestamps: true,
  }
);

/**
 * Define OrderDetail associations
 */
OrderDetail.belongsTo(Order);
OrderDetail.belongsTo(Inventory);

export default OrderDetail;
