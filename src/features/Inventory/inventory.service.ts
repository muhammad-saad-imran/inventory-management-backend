import { CreationAttributes, Attributes } from "sequelize";
import BaseService from "../../abstractions/BaseService";
import Inventory from "../../database/models/Inventory";
import ProductService from "../Product/product.service";
import SupplierService from "../Supplier/supplier.service";
import BadRequestError from "../../Errors/BadRequestError";
import Supplier from "../../database/models/Supplier";
import Product from "../../database/models/Product";
import NotFoundError from "../../Errors/NotFoundError";
import { UpdateStock } from "./inventory.validation";

export default class InventoryService extends BaseService<Inventory> {
  constructor(
    private productService: ProductService,
    private supplierService: SupplierService
  ) {
    super(Inventory);
  }

  override async get(id: string): Promise<Inventory> {
    const inventory = await Inventory.findByPk(id, {
      include: [Supplier, Product],
    });
    if (inventory) {
      return inventory;
    } else {
      throw new NotFoundError("Inventory item not found");
    }
  }

  override async create(
    newInventory: CreationAttributes<Inventory>
  ): Promise<Inventory> {
    const product = await this.productService.get(newInventory.productId);
    if (!product) {
      throw new BadRequestError("Product not found");
    }
    const supplier = await this.supplierService.get(newInventory.supplierId);
    if (!supplier) {
      throw new BadRequestError("Supplier not found");
    }
    return super.create(newInventory);
  }

  override async update(
    id: string,
    updateValues: Partial<Attributes<Inventory>>
  ): Promise<Inventory> {
    if (updateValues.productId) {
      const product = await this.productService.get(updateValues.productId);
      if (!product) {
        throw new BadRequestError("Product not found");
      }
    }
    if (updateValues.supplierId) {
      const supplier = await this.supplierService.get(updateValues.supplierId);
      if (!supplier) {
        throw new BadRequestError("Supplier not found");
      }
    }
    return super.update(id, updateValues);
  }

  async updateStock(id: string, updateValue: UpdateStock) {
    const inventory = await this.get(id);
    const { change } = updateValue;
    if (change < 0 && inventory.stock + change < 0) {
      throw new BadRequestError("Not enough stock available");
    }
    return this.update(id, { stock: inventory.stock + change });
  }
}
