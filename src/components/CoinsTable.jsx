import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../context/CryptoContext";

export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchCoinsList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const navigate = useNavigate();

  return (
    <div className="mt-10 w-full px-2 flex flex-col items-center gap-10">
      <input
        className="input input-bordered w-full "
        type="text"
        placeholder="Search Coins"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto w-full h-[780px]">
        {loading ? (
          <progress className="progress" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin) => {
                    const profit = coin.price_change_percentage_24h >= 0;
                    return (
                      <tr
                        onClick={() => {
                          navigate(`/coins/${coin.name}`);
                        }}
                        className="cursor-pointer hover"
                        key={coin.name}
                      >
                        <td>
                          <div className="flex items-center gap-4">
                            <img
                              className="w-10 object-contain"
                              src={coin?.image}
                              alt={coin?.name}
                            />
                            <p>{coin?.name}</p>
                          </div>
                        </td>
                        <td>
                          {symbol} {coin?.current_price}
                        </td>
                        <td>
                          <p
                            className={`${
                              profit ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {profit
                              ? "+" + coin?.price_change_percentage_24h
                              : coin?.price_change_percentage_24h}
                            %
                          </p>
                        </td>
                        <td>
                          <p>
                            {symbol} {numberWithCommas(coin?.market_cap)}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="btn-group mb-5">
        {coins.slice(0, coins.length / 10).map((_, index) => {
          return (
            <button
              key={index}
              className={`btn btn-sm md:btn-md ${
                page === index + 1 ? "btn-active" : ""
              }`}
              value={index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CoinsTable;
