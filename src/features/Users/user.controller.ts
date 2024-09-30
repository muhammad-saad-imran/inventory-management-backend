import { Request, Response } from "express";
import BaseController from "../../abstractions/BaseController";
import User from "../../database/models/User";
import UserService from "./user.service";
import { userSchema } from "./user.validation";
import { handleResponse } from "../../utils/route.utils";

export default class UserController extends BaseController<User> {
  constructor(private userService: UserService) {
    super(userService, userSchema);
  }

  override async get(req: Request, res: Response): Promise<void> {
    const user = await this.userService.get(req.userId!);
    handleResponse(res, user);
  }
}
