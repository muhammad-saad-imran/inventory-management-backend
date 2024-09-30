import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  UUIDV4,
} from "sequelize";
import sequelize from "../index";
import Inventory from "./Inventory";

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  id!: string;
  name!: string;
  description!: string;
  createdAt!: Date;
  updatedAt!: Date;

  /** Asscoiation attributes */
  inventory!: NonAttribute<Inventory[]>;
}

/**
 * Initialize Product model
 */
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
    tableName: "product",
    timestamps: true,
  }
);

export default Product;
