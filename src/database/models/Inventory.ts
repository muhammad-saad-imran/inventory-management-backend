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
import Supplier from "./Supplier";
import Product from "./Product";
import OrderItem from "./OrderItem";

class Inventory extends Model<
  InferAttributes<Inventory>,
  InferCreationAttributes<Inventory>
> {
  id!: string;
  supplierId!: ForeignKey<Supplier["id"]>;
  productId!: ForeignKey<Product["id"]>;
  cost!: number;
  supplyDate!: Date;
  stock!: number;
  createdAt!: Date;
  updatedAt!: Date;

  /** Association attributes */
  supplier!: NonAttribute<Supplier>;
  product!: NonAttribute<Product>;
  orderItems!: NonAttribute<OrderItem[]>;
}

/**
 * Initialize Inventory model
 */
Inventory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    cost: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    supplyDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: true,
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
    tableName: "inventory",
    timestamps: true,
  }
);

/**
 * Define Inventory associations
 */
Inventory.belongsTo(Supplier);
Inventory.belongsTo(Product);

Inventory.hasMany(OrderItem, {
  foreignKey: "inventoryId",
});

export default Inventory;
