import BaseService from "../../abstractions/BaseService";
import Supplier from "../../database/models/Supplier";

export default class SupplierService extends BaseService<Supplier> {
  constructor() {
    super(Supplier);
  }
}
