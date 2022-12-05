import Drink from "./Drink";

export default class StoredDrink extends Drink {
  id: string;
  score: number;
  constructor() {
    super();
    this.id = "";
    this.score = 0;
  }
}
