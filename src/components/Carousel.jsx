import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../context/CryptoContext";

const Carousel = () => {
  const [coins, setCoins] = useState([]);
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(false);

  const fetchTrendingCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TrendingCoins(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = coins.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <div
        key={coin.name}
        className="card w-44 md:w-48 h-60 bg-neutral shadow-xl hover:border hover:border-1 hover:border-gray-50000"
      >
        <Link to={`/coins/${coin.id}`}>
          <figure className="m-10 mb-0">
            <img src={coin?.image} alt="Shoes" className="rounded-xl w-14" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{coin?.name}</h2>
            <p className={`${profit ? "text-green-400" : "text-red-400"}`}>
              {profit
                ? "+" + coin?.price_change_percentage_24h
                : coin?.price_change_percentage_24h}
              %
            </p>
            <p className="font-semibold text-lg">
              {symbol} {coin?.current_price}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    768: {
      items: 4,
    },
  };

  return (
    <>
      <div className="mt-10 h-64 flex items-center justify-center w-full">
        {!loading ? (
          <AliceCarousel
            items={items}
            autoPlay
            disableButtonsControls
            disableDotsControls
            mouseTracking
            touchTracking
            responsive={responsive}
            infinite
            paddingLeft={10}
            animationDuration={2500}
            autoPlayInterval={1000}
          />
        ) : (
          <progress className="progress" />
        )}
      </div>
    </>
  );
};

export default Carousel;
