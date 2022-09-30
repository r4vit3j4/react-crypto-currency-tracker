import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CryptoContext from "./context/CryptoContext";
import "./index.css";
import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CryptoContext>
  </React.StrictMode>
);
