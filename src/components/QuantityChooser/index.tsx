import React, { memo } from "react";
import QCData from "./QCData";
import "./QuantityChooser.css";

interface Props {
  handleQuantityChange: Function;
}

const QuantityChooser = memo(
  function QuantityChooser({ handleQuantityChange }: Props): JSX.Element {
    console.log("Re-rendering QuantityChooser");

    const radiogroup = QCData.map((value) => {
      return (
        <button
          type="button"
          onClick={() => handleQuantityChange(value.value)}
          key={value.value}
          className="quantity-chooser-button"
        >
          <>
            {value.logo}
            {value.label}
          </>
        </button>
      );
    });
    return <div className="quantity-chooser">{radiogroup}</div>;
  },
  (prevProps, nextProps) => true
);

export default QuantityChooser;
