import BaseController from "../../abstractions/BaseController";
import Product from "../../database/models/Product";
import ProductService from "./product.service";
import { productSchema } from "./product.validation";

export default class ProductController extends BaseController<Product> {
  constructor(productService: ProductService) {
    super(productService, productSchema);
  }
}
