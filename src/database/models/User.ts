import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from "sequelize";
import sequelize from "..";

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User, { omit: "id" | "createdAt" | "updatedAt" }>
> {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

/**
 * Initialize User Model
 */
User.init(
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
    password: {
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
    tableName: "user",
    timestamps: true,
  }
);

export default User;
