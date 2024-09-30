import BaseService from "../../abstractions/BaseService";
import Product from "../../database/models/Product";

export default class ProductService extends BaseService<Product> {
  constructor() {
    super(Product);
  }
}
