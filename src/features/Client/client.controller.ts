import BaseController from "../../abstractions/BaseController";
import Client from "../../database/models/Client";
import ClientService from "./client.service";
import { clientSchema } from "./client.validation";

export default class ClientController extends BaseController<Client> {
  constructor(service: ClientService) {
    super(service, clientSchema);
  }
}
