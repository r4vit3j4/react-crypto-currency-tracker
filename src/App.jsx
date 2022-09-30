import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CoinPage from "./pages/CoinPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
