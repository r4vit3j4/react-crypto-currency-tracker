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
    <div className="w-full flex items-center justify-center">
      <div className="navbar bg-base-100 w-full max-w-6xl">
        <div className="flex-1">
          <Link to={"/"}>
            <a className="btn btn-ghost normal-case text-xl">Crypto Tracker</a>
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
    </div>
  );
};

export default Navbar;
