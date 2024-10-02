import { CreationAttributes, Transaction } from "sequelize";
import BaseService from "../../abstractions/BaseService";
import Supplier from "../../database/models/Supplier";
import BadRequestError from "../../Errors/BadRequestError";

export default class SupplierService extends BaseService<Supplier> {
  constructor() {
    super(Supplier);
  }

  override async create(
    newSupplier: CreationAttributes<Supplier>,
    transaction?: Transaction
  ): Promise<Supplier> {
    const product = await Supplier.findOne({
      where: { name: newSupplier.name },
    });
    if (product) {
      throw new BadRequestError("Supplier with name already exists");
    }
    return super.create(newSupplier, transaction);
  }
}
