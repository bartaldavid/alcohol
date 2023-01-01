export interface Drink {
  quantity?: number;
  alcoholContent?: number;
  price?: number;
}

export interface StoredDrink extends Drink {
  name?: string;
  id: string;
  score: number;
}
