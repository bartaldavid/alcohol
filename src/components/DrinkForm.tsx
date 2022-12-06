import React, { FormEvent, useState } from "react";
import Drink from "../Drink";
import { v4 as uuidv4 } from "uuid";
import "./DrinkForm.css";
import QuantityChooser from "./QuantityChooser";

const DrinkForm = ({ saveDrinkToArray }: any) => {
  const [form, setForm] = useState(new Drink());
  const [score, setScore] = useState(0);

  const calcScore = (drink: Drink) => {
    return +(
      (drink.price * 10000) /
      (drink.quantity * drink.alcoholContent)
    ).toFixed(0);
  };

  const updateScore = (data: Drink) => {
    setScore(calcScore(data));
  };

  const handleNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.id]: Number(event.target.value) });
    updateScore({ ...form, [event.target.id]: Number(event.target.value) });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const handleQuantityChange = (value: number) => {
    setForm({ ...form, ["quantity"]: value });
    console.log(value);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateScore(form);
    saveDrinkToArray({ ...form, id: uuidv4(), score: calcScore(form) });
  }

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
              onChange={handleNameChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <div className="input-wrapper">
            <input
              type="number"
              id="quantity"
              value={form.quantity}
              autoComplete="off"
              onChange={handleNumChange}
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
              value={form.alcoholContent}
              onChange={handleNumChange}
              autoComplete="off"
              min="0"
              max={100}
            />
            <span className="input-text">%</span>
          </div>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <div className="input-wrapper">
            <input
              type="number"
              autoComplete="off"
              id="price"
              value={form.price}
              onChange={handleNumChange}
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
