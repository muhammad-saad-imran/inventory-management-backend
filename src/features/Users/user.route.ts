import { Router } from "express";
import UserController from "./user.controller";
import UserService from "./user.service";
import validateUserMiddleware from "../../middleware/validateUserMiddleware";

const service = new UserService();
const controller = new UserController(service);

const userRouter = Router();

userRouter.get("/", validateUserMiddleware, async (req, res) =>
  controller.get(req, res)
);

export default userRouter;
