"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const Supplier_1 = __importDefault(require("./Supplier"));
const Product_1 = __importDefault(require("./Product"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Inventory extends sequelize_1.Model {
}
/**
 * Initialize Inventory model
 */
Inventory.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
    },
    cost: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    supplyDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    stock: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: __1.default,
    tableName: "inventory",
    timestamps: true,
});
/**
 * Define Inventory associations
 */
Inventory.belongsTo(Supplier_1.default);
Inventory.belongsTo(Product_1.default);
Inventory.hasMany(OrderItem_1.default, {
    foreignKey: "inventoryId",
});
exports.default = Inventory;
