import { Product } from "./product.model";

export class Item {
    product: Product | undefined;
    quantity: number | undefined;

  
    constructor(json?: any) {
      if (json) {
        this.product = json.product;
        this.quantity = json.quantity;
      }
    }
}
