import { Router } from "express";
import OrderItemService from "./orderItem.service";
import OrderItemController from "./orderItem.contoller";
import OrderService from "../Order/order.service";
import InventoryService from "../Inventory/inventory.service";
import ClientService from "../Client/client.service";
import ProductService from "../Product/product.service";
import SupplierService from "../Supplier/supplier.service";
import validateUserMiddleware from "../../middleware/validateUserMiddleware";

const inventoryService = new InventoryService(
  new ProductService(),
  new SupplierService()
);
const orderService = new OrderService(new ClientService());
const service = new OrderItemService(orderService, inventoryService);
const controller = new OrderItemController(service);

const orderItemRouter = Router();

orderItemRouter.use(validateUserMiddleware);
orderItemRouter.get(`/:orderId`, async (req, res) => controller.get(req, res));
orderItemRouter.post(`/`, async (req, res) => controller.create(req, res));
orderItemRouter.patch(`/:orderId/:inventoryId`, async (req, res) =>
  controller.update(req, res)
);
orderItemRouter.delete(`/:orderId/:inventoryId`, async (req, res) =>
  controller.delete(req, res)
);

export default orderItemRouter;
