import User from "../../database/models/User";
import BaseService from "../../abstractions/BaseService";
import BadRequestError from "../../Errors/BadRequestError";
import NotFoundError from "../../Errors/NotFoundError";
import { CreateUser } from "../Users/user.validation";
import { Login } from "./auth.validtion";
import { compareHash, createToken, encrypt } from "../../utils/auth.utils";

export default class AuthService extends BaseService<User> {
  constructor() {
    super(User);
  }

  async signup(newUser: CreateUser) {
    const user = await User.findOne({ where: { email: newUser.email } });
    if (user) {
      throw new BadRequestError("User already exists");
    }

    newUser.password = await encrypt(newUser.password);
    return this.create(newUser);
  }

  async login(creds: Login) {
    const user = await User.findOne({ where: { email: creds.email } });
    if (!user) {
      throw new NotFoundError("Invalid credentials");
    }

    const isPassValid = await compareHash(creds.password, user.password);
    if (isPassValid) {
      return createToken({ userId: user.id });
    } else {
      throw new NotFoundError("Invalid credentials");
    }
  }
}
