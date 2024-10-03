import { CreationAttributes, Transaction } from "sequelize";
import BaseService from "../../abstractions/BaseService";
import Client from "../../database/models/Client";
import BadRequestError from "../../Errors/BadRequestError";

export default class ClientService extends BaseService<Client> {
  constructor() {
    super(Client);
  }

  override async create(
    newClient: CreationAttributes<Client>,
    transaction?: Transaction
  ): Promise<Client> {
    const client = await Client.findOne({ where: { name: newClient.name } });
    if (client) {
      throw new BadRequestError("Client with name already exists");
    }
    return super.create(newClient, transaction);
  }
}
