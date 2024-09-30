"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Order_1 = __importDefault(require("./Order"));
const Inventory_1 = __importDefault(require("./Inventory"));
const __1 = __importDefault(require(".."));
class OrderItem extends sequelize_1.Model {
}
/**
 * Initialize OrderItem Model
 */
OrderItem.init({
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    inventoryId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
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
    tableName: "orderItems",
    timestamps: true,
});
/**
 * Define OrderItem associations
 */
OrderItem.belongsTo(Order_1.default);
OrderItem.belongsTo(Inventory_1.default);
exports.default = OrderItem;
