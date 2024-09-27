import { Router } from "express";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

const service = new AuthService();
const controller = new AuthController(service);

const authRouter = Router();

authRouter.post(`/signup`, async (req, res) => controller.create(req, res));
authRouter.post(`/login`, async (req, res) => controller.login(req, res));

export default authRouter;
