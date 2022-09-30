import React, { createContext, useContext, useEffect, useState } from "react";

export const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    setSymbol(currency === "INR" ? "₹" : "$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ symbol, currency, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
