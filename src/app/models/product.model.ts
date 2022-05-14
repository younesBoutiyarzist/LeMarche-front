export class Product {
    id: number | undefined;
    name: string | undefined;
    price: number | undefined;

  
    constructor(json?: any) {
      if (json) {
        this.id = json.id;
        this.name = json.name;
        this.price = json.price;
      }
    }
}
