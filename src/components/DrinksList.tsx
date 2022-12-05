import StoredDrink from "../StoredDrink";
import DrinkCard from "./DrinkCard";
import React from "react";

type Props = { drinks: StoredDrink[] };

const DrinksList: Function = ({ drinks }: Props): JSX.Element[] => {
  return drinks.map((drink: StoredDrink) => {
    return <DrinkCard key={drink.id} drink={drink} />;
  });
};

export default DrinksList;
