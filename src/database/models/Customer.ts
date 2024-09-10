import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  UUIDV4,
} from "sequelize";
import sequelize from "..";
import Order from "./Order";

class Customer extends Model<
  InferAttributes<Customer>,
  InferCreationAttributes<Customer>
> {
  id!: string;
  name!: string;
  email!: string;
  phoneNumber!: string;
  createdAt!: Date;
  updatedAt!: Date;

  /** Association attributes */
  orders!: NonAttribute<Order[]>;
}

/**
 * Initialize Customer model
 */
Customer.init(
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
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
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
    tableName: "customers",
    timestamps: true,
  }
);

/**
 * Customer associations
 */
Customer.hasMany(Order, {
  foreignKey: "customerId",
});

export default Customer;
