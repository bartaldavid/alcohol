import React, { FormEvent, useCallback, useState } from "react";
import Drink from "../../Drink";
import { v4 as uuidv4 } from "uuid";
import "./DrinkForm.css";
import QuantityChooser from "../QuantityChooser";

const DrinkForm = ({ saveDrinkToArray }: any): JSX.Element => {
  const [form, setForm] = useState<Drink>({});

  const score =
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    form.price && form.quantity && form.alcoholContent
      ? +((form.price * 10000) / (form.quantity * form.alcoholContent)).toFixed(
          0
        )
      : 0;

  // this probably could be simplified but removing type conversion makes score NaN
  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setForm({
      ...form,
      [event.target.id]:
        event.currentTarget.id === "name"
          ? event.currentTarget.value
          : Number(event.currentTarget.value),
    });
  };

  // this could also be combined into the function above
  // FIXME this makes QuantityChooser re-render every time the form changes: memo & useCallback?
  const handleQuantityChange = useCallback(
    function handleQuantityChange(value: number): void {
      setForm({ ...form, quantity: value });
      console.log(`handling quantity change: ${value}`);
    },
    [form.quantity]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
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
