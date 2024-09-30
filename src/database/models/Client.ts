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

class Client extends Model<
  InferAttributes<Client>,
  InferCreationAttributes<Client>
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
 * Initialize Client model
 */
Client.init(
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
    tableName: "clients",
    timestamps: true,
  }
);

/**
 * Client associations
 */
Client.hasMany(Order, {
  foreignKey: "clientId",
});

export default Client;
