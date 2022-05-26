export class Personne {
    id: number | undefined;
    name: string | undefined;
    cash: number | undefined;

  
    constructor(json?: any) {
      if (json) {
        this.id = json.id;
        this.name = json.name;
        this.cash = json.cash;
      }
    }
}
