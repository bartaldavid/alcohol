import React from "react";
import QCData from "./QCData";
import "./QuantityChooser.css";

interface Props {
  handleQuantityChange: Function;
}

const QuantityChooser = ({ handleQuantityChange }: Props): JSX.Element => {
  const handleQuantityChoice = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    handleQuantityChange(event.currentTarget.value);
  };

  const radiogroup = QCData.map((value) => {
    return (
      <button
        type="button"
        onClick={handleQuantityChoice}
        value={value.value}
        key={value.value}
        className="quantity-chooser-button"
      >
        <>
          {/* TODO ettől telefonon nem responsive */}
          {value.logo}
          {value.label}
        </>
      </button>
    );
  });
  return <div className="quantity-chooser">{radiogroup}</div>;
};

export default QuantityChooser;
