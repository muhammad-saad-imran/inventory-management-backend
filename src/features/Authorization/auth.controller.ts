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
    const newUser: any = this.schema.parse(req.body);
    const createdUser = await this.authService.signup(newUser);
    handleResponse(res, createdUser, 201);
  }

  async login(req: Request, res: Response): Promise<void> {
    const creds: any = loginSchema.parse(req.body);
    const token = await this.authService.login(creds);
    handleResponse(res, { token });
  }
}
