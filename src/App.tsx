/* eslint-disable react/react-in-jsx-scope */
import "normalize.css";
import "./App.css";
import DrinkForm from "./components/DrinkForm/DrinkForm";
import DrinkCard from "./components/DrinkCard/DrinkCard";
import { StoredDrink } from "./Drink";
import useSavedState from "./hooks/useSavedState";
import { GiTrashCan } from "react-icons/gi";

const LOCAL_STORAGE_KEY: string = "alcholapp.drinks";

function App(): JSX.Element {
  const [drinks, setDrinks] = useSavedState([], LOCAL_STORAGE_KEY);

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
