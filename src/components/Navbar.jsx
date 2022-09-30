import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

const options = [
  {
    label: "INR",
    value: "INR",
  },
  {
    label: "USD",
    value: "USD",
  },
];

const Navbar = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <div className="navbar bg-neutral text-neutral-content w-full max-w-6xl shadow-md border border-1 border-gray-600 md:rounded-2xl md:mt-2">
      <div className="flex-1">
        <Link to={"/"}>
          <p className="btn btn-ghost normal-case text-xl">Crypto Tracker</p>
        </Link>
      </div>
      <div className="flex-none">
        <select
          className="select w-full max-w-xs"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {options.map((option) => (
            <option className="p-2" value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
