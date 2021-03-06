import { Product } from "./product.model";

export class Element {
    product: Product = new Product();
    quantity: number | undefined;

  
    constructor(json?: any) {
      if (json) {
        this.product = json.product;
        this.quantity = json.quantity;
      }
    }
}
