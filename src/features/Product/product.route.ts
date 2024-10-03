import { Router } from "express";
import ProductService from "./product.service";
import ProductController from "./product.controller";
import validateUserMiddleware from "../../middleware/validateUserMiddleware";

const service = new ProductService();
const controller = new ProductController(service);

const productRouter = Router();

productRouter.use(validateUserMiddleware);
productRouter.get(`/:id`, async (req, res) => controller.get(req, res));
productRouter.get(`/`, async (req, res) => controller.getAll(req, res));
productRouter.post(`/`, async (req, res) => controller.create(req, res));
productRouter.patch(`/:id`, async (req, res) => controller.update(req, res));
productRouter.delete(`/:id`, async (req, res) => controller.delete(req, res));

export default productRouter;
