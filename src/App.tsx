import "./App.css";
import DrinkForm from "./components/DrinkForm";
import DrinksList from "./components/DrinksList";
import { useState } from "react";
import Drink from "./Drink";
import StoredDrink from "./StoredDrink";

function App() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  // const [currentDrink, setCurrentDrink] = useState(new Drink());

  function saveDrinkToArray(currentDrink: StoredDrink) {
    setDrinks((prevDrinks) => [...prevDrinks, currentDrink]);
    console.log(currentDrink);
  }

  return (
    <>
      <div className="form-container">
        <DrinkForm saveDrinkToArray={saveDrinkToArray} />
      </div>
      <div className="drinks-container">
        <DrinksList drinks={drinks} />
      </div>
    </>
  );
}

export default App;
