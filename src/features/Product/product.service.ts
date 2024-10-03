import { CreationAttributes, Transaction } from "sequelize";
import BaseService from "../../abstractions/BaseService";
import Product from "../../database/models/Product";
import BadRequestError from "../../Errors/BadRequestError";

export default class ProductService extends BaseService<Product> {
  constructor() {
    super(Product);
  }

  override async create(
    newProduct: CreationAttributes<Product>,
    transaction?: Transaction
  ): Promise<Product> {
    const product = await Product.findOne({ where: { name: newProduct.name } });
    if (product) {
      throw new BadRequestError("Product with name already exists");
    }
    return super.create(newProduct, transaction);
  }
}
