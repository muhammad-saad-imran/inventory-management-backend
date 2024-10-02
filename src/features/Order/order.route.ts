import { Router } from "express";
import OrderService from "./order.service";
import OrderController from "./order.controller";
import ClientService from "../Client/client.service";
import validateUserMiddleware from "../../middleware/validateUserMiddleware";

const service = new OrderService(new ClientService());
const controller = new OrderController(service);

const orderRouter = Router();

orderRouter.use(validateUserMiddleware);
orderRouter.get(`/:id`, async (req, res) => controller.get(req, res));
orderRouter.get(`/`, async (req, res) => controller.getAll(req, res));
orderRouter.post(`/`, async (req, res) => controller.create(req, res));
orderRouter.patch(`/update-status/:id`, async (req, res) => controller.update(req, res));

export default orderRouter;
