import { Router } from "express";
import SupplierController from "./supplier.controller";
import SupplierService from "./supplier.service";
import validateUserMiddleware from "../../middleware/validateUserMiddleware";

const service = new SupplierService();
const controller = new SupplierController(service);

const supplierRouter = Router();

supplierRouter.use(validateUserMiddleware);
supplierRouter.get(`/:id`, async (req, res) => controller.get(req, res));
supplierRouter.get(`/`, async (req, res) => controller.getAll(req, res));
supplierRouter.post(`/`, async (req, res) => controller.create(req, res));
supplierRouter.patch(`/:id`, async (req, res) => controller.update(req, res));
supplierRouter.delete(`/:id`, async (req, res) => controller.delete(req, res));

export default supplierRouter;
