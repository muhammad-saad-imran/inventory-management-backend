import { Router } from "express";
import ClientService from "./client.service";
import ClientController from "./client.controller";
import validateUserMiddleware from "../../middleware/validateUserMiddleware";

const service = new ClientService();
const controller = new ClientController(service);

const clientRouter = Router();

clientRouter.use(validateUserMiddleware);
clientRouter.get(`/:id`, async (req, res) => controller.get(req, res));
clientRouter.get(`/`, async (req, res) => controller.getAll(req, res));
clientRouter.post(`/`, async (req, res) => controller.create(req, res));
clientRouter.patch(`/:id`, async (req, res) => controller.update(req, res));
clientRouter.delete(`/:id`, async (req, res) => controller.delete(req, res));

export default clientRouter;