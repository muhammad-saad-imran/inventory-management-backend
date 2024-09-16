"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const Client_1 = __importDefault(require("./Client"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order extends sequelize_1.Model {
}
/**
 * Initialize Order model
 */
Order.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: __1.default,
    tableName: "order",
    timestamps: true,
});
/**
 * Define Order associations
 */
Order.belongsTo(Client_1.default);
Order.hasMany(OrderItem_1.default, {
    foreignKey: "orderId",
});
exports.default = Order;
