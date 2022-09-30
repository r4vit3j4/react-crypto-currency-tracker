import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../context/CryptoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { chartDays } from "../config/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  return (
    <div className="mt-10 w-full">
      {/* chart */}

      {!historicalData ? (
        <progress className="progress" />
      ) : (
        <Line
          data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;

              return days == 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in ${currency}`,
                borderColor: "#6419e6",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}

      {/* Buttons */}
      <div className="flex flex-wrap justify-center items-center ml-auto gap-5 mt-5 my-10">
        {chartDays.map((day) => (
          <button
            className={`btn ${day.value === days ? "btn-primary" : ""}`}
            onClick={(e) => setDays(day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinInfo;
