export class Element {
    name: string | undefined;
    quantity: number | undefined;

  
    constructor(json?: any) {
      if (json) {
        this.name = json.name;
        this.quantity = json.quantity;
      }
    }
}
