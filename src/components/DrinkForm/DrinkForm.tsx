import React, { FormEvent, useState } from "react";
import Drink from "../../Drink";
import { v4 as uuidv4 } from "uuid";
import "./DrinkForm.css";
import QuantityChooser from "../QuantityChooser";

const DrinkForm = ({ saveDrinkToArray }: any): JSX.Element => {
  // TODO make this initial value null
  const [form, setForm] = useState<Drink>({});
  // const [form, setForm] = useState<Drink>({
  //   name: "",
  //   quantity: 0,
  //   alcoholContent: 0,
  //   price: 1,
  // });
  const [score, setScore] = useState(0);

  const updateScore = (drink: Drink): void => {
    // FIXME should this be fixed?
    if (drink.price && drink.quantity && drink.alcoholContent) {
      setScore(
        +(
          (drink.price * 10000) /
          (drink.quantity * drink.alcoholContent)
        ).toFixed(0)
      );
    } else {
      setScore(0);
    }
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let newValue;
    if (event.currentTarget.id === "name") {
      newValue = event.currentTarget.value;
    } else {
      newValue = Number(event.currentTarget.value);
    }
    setForm({ ...form, [event.target.id]: newValue });
    updateScore({ ...form, [event.target.id]: newValue });
  };

  // this could also be combined into the function above
  const handleQuantityChange = (value: number): void => {
    setForm({ ...form, quantity: value });
    updateScore({ ...form, quantity: value });
    // console.log(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // updateScore(form); this might be unneccessary
    saveDrinkToArray({ ...form, id: uuidv4(), score });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Title</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <div className="input-wrapper">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              id="quantity"
              value={form.quantity}
              autoComplete="off"
              onChange={handleFormChange}
            />
            <span className="input-text">ml</span>
          </div>
        </div>
        <QuantityChooser handleQuantityChange={handleQuantityChange} />
        <div>
          <label htmlFor="alcoholContent">Alcohol content</label>
          <div className="input-wrapper">
            <input
              type="number"
              id="alcoholContent"
              step={0.1}
              min={0}
              value={form.alcoholContent}
              onChange={handleFormChange}
              autoComplete="off"
            />
            <span className="input-text">%</span>
          </div>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <div className="input-wrapper">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              autoComplete="off"
              id="price"
              value={form.price}
              onChange={handleFormChange}
            />
            <span className="input-text">Ft</span>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
      <div id="score-div">
        <h1>{score}</h1>
        <p>Ft / dl of pure alcohol</p>
      </div>
    </>
  );
};

export default DrinkForm;
