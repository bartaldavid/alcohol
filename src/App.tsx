/* eslint-disable react/react-in-jsx-scope */
import "normalize.css";
import "./App.css";
import DrinkForm from "./components/DrinkForm/DrinkForm";
import DrinkCard from "./components/DrinkCard/DrinkCard";
import { useState, useEffect } from "react";
import StoredDrink from "./StoredDrink";
import { GiTrashCan } from "react-icons/gi";

const LOCAL_STORAGE_KEY: string = "alcholapp.drinks";

function App(): JSX.Element {
  const [drinks, setDrinks] = useState<StoredDrink[]>([]);

  // TODO refractor this into a custom hook
  useEffect(() => {
    const storedDrinks: StoredDrink[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"
    );
    if (storedDrinks.length !== 0) setDrinks(() => [...storedDrinks]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drinks));
  }, [drinks]);

  // useCallback?
  const saveDrinkToArray = (currentDrink: StoredDrink): void => {
    setDrinks((prevDrinks) => [...prevDrinks, currentDrink]);
    // console.log(currentDrink);
  };

  return (
    <>
      <div className="form-container">
        <DrinkForm saveDrinkToArray={saveDrinkToArray} />
      </div>
      <div className="drinks-container">
        {drinks.map((drink: StoredDrink) => {
          return <DrinkCard key={drink.id} drink={drink} />;
        })}
      </div>
      {drinks.length > 0 && (
        <div id="clear-all-div">
          <button onClick={() => setDrinks([])} id="clear-all-button">
            <GiTrashCan /> Clear all
          </button>
        </div>
      )}
    </>
  );
}

export default App;
