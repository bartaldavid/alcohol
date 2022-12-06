import React from "react";
import QCData from "./QCData";
import "./QuantityChooser.css";

type Props = { handleQuantityChange: Function };

const QuantityChooser = ({ handleQuantityChange }: Props) => {
  const handleQuantityChoice = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
          {/* <value.logo /> TODO ez valamiért elrontja */}
          {value.label}
        </>
      </button>
    );
  });
  return <div className="quantity-chooser">{radiogroup}</div>;
};

export default QuantityChooser;
