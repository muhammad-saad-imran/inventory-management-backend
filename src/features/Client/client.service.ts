import BaseService from "../../abstractions/BaseService";
import Client from "../../database/models/Client";

export default class ClientService extends BaseService<Client> {
  constructor() {
    super(Client);
  }
}
