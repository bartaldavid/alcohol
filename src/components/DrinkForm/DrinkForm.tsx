import React, { FormEvent, useCallback, useRef, useState } from "react";
import { Drink, StoredDrink } from "../../Drink";
import "./DrinkForm.css";
import QuantityChooser from "../QuantityChooser";

interface Props {
  saveDrinkToArray: (drink: StoredDrink) => void;
}

const DrinkForm = ({ saveDrinkToArray }: Props): JSX.Element => {
  const [form, setForm] = useState<Drink>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  const score =
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    form.price && form.quantity && form.alcoholContent
      ? +((form.price * 10000) / (form.quantity * form.alcoholContent)).toFixed(
          0
        )
      : 0;

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setForm({
      ...form,
      [event.target.id]: +event.currentTarget.value,
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
    saveDrinkToArray({
      ...form,
      id: crypto.randomUUID(),
      score,
      name: nameInputRef.current?.value,
    });
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
              onChange={handleFormChange}
              autoComplete="off"
              ref={nameInputRef}
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
