import Drink from "./Drink";

export default interface StoredDrink extends Drink {
  id: string;
  score: number;
}
