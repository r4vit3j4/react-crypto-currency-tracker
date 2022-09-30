import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/CoinsTable";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const [loading, setLoading] = useState(false);

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className="w-full mt-10 rounded-xl min-h-64 flex items-center justify-center">
      {!loading ? (
        coin && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col  items-center gap-3 text-center">
              <figure>
                <img
                  className="object-contain w-32"
                  src={coin.image.large}
                  alt=""
                />
              </figure>
              <h2>{coin.name}</h2>
              <p>{ReactHtmlParser(coin?.description.en.split(". ")[0])}</p>
              <p className="text-lg">
                <span className="font-bold">Rank :</span>{" "}
                {coin?.market_cap_rank}
              </p>
              <p className="text-lg">
                <span className="font-bold">Current Price :</span> {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </p>
              <p className="text-lg">
                <span className="font-bold">Market Cap : </span>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </p>
            </div>

            <CoinInfo coin={coin} />
          </div>
        )
      ) : (
        <progress className="progress" />
      )}
    </div>
  );
};

export default CoinPage;
