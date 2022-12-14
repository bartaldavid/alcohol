import React from "react";
import { StoredDrink } from "../../Drink";
import "./DrinkCard.css";

// TODO add a delete button
const DrinkCard: React.FC<{ drink: StoredDrink }> = ({ drink }) => {
  return (
    <div className="drink-card">
      <h5 className="drink-name">{drink.name}</h5>
      <div className="drink-data">
        <p>{drink.alcoholContent} %</p>
        <p>{drink.price} Ft</p>
        <p>{drink.quantity} ml</p>
      </div>
      <p className="drink-card-score">{drink.score}</p>
    </div>
  );
};

export default DrinkCard;
