import { Request, Response } from "express";
import BaseController from "../../abstractions/BaseController";
import Inventory from "../../database/models/Inventory";
import InventoryService from "./inventory.service";
import { changeStockSchema, inventorySchema } from "./inventory.validation";
import { handleResponse } from "../../utils/route.utils";

export default class InventoryController extends BaseController<Inventory> {
  constructor(private inventoryService: InventoryService) {
    super(inventoryService, inventorySchema);
  }

  async updateStock(req: Request, res: Response) {
    changeStockSchema.parse(req.body);
    const inventory = await this.inventoryService.updateStock(
      req.params.id,
      req.body
    );
    handleResponse(res, inventory);
  }
}
