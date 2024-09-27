import BaseService from "../../abstractions/BaseService";
import User from "../../database/models/User";
import NotFoundError from "../../Errors/NotFoundError";

export default class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }

  override async get(id: string): Promise<User> {
    const user = await User.findByPk(id, {
      attributes: ["id", "email", "name", "createdAt"],
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundError("User not found");
    }
  }
}
