import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  UUIDV4,
} from "sequelize";
import sequelize from "..";
import Inventory from "./Inventory";

class Supplier extends Model<
  InferAttributes<Supplier>,
  InferCreationAttributes<Supplier>
> {
  id!: string;
  name!: string;
  email!: string;
  phoneNumber!: string;
  createdAt!: Date;
  updatedAt!: Date;

  /** Association attributes */
  inventory!: NonAttribute<Inventory[]>;
}

/**
 * Initialize Supplier model
 */
Supplier.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
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
    tableName: "supplier",
    timestamps: true,
  }
);

export default Supplier;
