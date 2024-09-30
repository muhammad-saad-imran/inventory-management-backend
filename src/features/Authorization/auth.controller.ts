import { Request, Response } from "express";
import User from "../../database/models/User";
import BaseController from "../../abstractions/BaseController";
import AuthService from "./auth.service";
import { userSchema } from "../Users/user.validation";
import { loginSchema } from "./auth.validtion";
import { handleResponse } from "../../utils/route.utils";

export default class AuthController extends BaseController<User> {
  constructor(private authService: AuthService) {
    super(authService, userSchema);
  }

  override async create(req: Request, res: Response): Promise<void> {
    this.schema.parse(req.body);
    const newUser = await this.authService.signup(req.body);
    handleResponse(res, newUser, 201);
  }

  async login(req: Request, res: Response): Promise<void> {
    loginSchema.parse(req.body);
    const token = await this.authService.login(req.body);
    handleResponse(res, { token });
  }
}
