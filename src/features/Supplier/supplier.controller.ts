import BaseController from "../../abstractions/BaseController";
import Supplier from "../../database/models/Supplier";
import SupplierSerivce from "./supplier.service";
import { supplierSchema } from "./supplier.validtion";

export default class SupplierController extends BaseController<Supplier> {
  constructor(service: SupplierSerivce) {
    super(service, supplierSchema);
  }
}
