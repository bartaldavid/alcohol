import React, { useState, useEffect } from "react";
import StoredDrink from "../StoredDrink";

export default function useSavedState(
  defaultValue: StoredDrink[],
  localStorageKey: string
): [StoredDrink[], React.Dispatch<React.SetStateAction<StoredDrink[]>>] {
  const [savedState, setSavedState] = useState<StoredDrink[]>(() => {
    const localStorageItem = localStorage.getItem(localStorageKey);

    if (localStorageItem === null) return defaultValue;
    try {
      return JSON.parse(localStorageItem);
    } catch (err) {
      console.log(err);
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(savedState));
  }, [savedState]);

  return [savedState, setSavedState];
}
