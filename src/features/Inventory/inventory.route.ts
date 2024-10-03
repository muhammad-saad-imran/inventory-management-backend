import { Router } from "express";
import InventoryService from "./inventory.service";
import InventoryController from "./inventory.controller";
import validateUserMiddleware from "../../middleware/validateUserMiddleware";
import ProductService from "../Product/product.service";
import SupplierService from "../Supplier/supplier.service";

const service = new InventoryService(
  new ProductService(),
  new SupplierService()
);
const controller = new InventoryController(service);

const inventoryRouter = Router();

inventoryRouter.use(validateUserMiddleware);
inventoryRouter.get(`/:id`, async (req, res) => controller.get(req, res));
inventoryRouter.get(`/`, async (req, res) => controller.getAll(req, res));
inventoryRouter.post(`/`, async (req, res) => controller.create(req, res));
inventoryRouter.patch(`/:id`, async (req, res) => controller.update(req, res));
inventoryRouter.patch(`/update-stock/:id`, async (req, res) =>
  controller.updateStock(req, res)
);

export default inventoryRouter;
