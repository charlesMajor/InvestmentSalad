"use client";

import CardDemo from "@/components/cardDemo";
import { useState } from "react";
import ChartDemo from "@/components/chartDemo";
import { useTranslation } from "react-i18next";
import { getYahooFinanceData } from "@/lib/services/yahooFinanceService";
import { CalendarFormDemo } from "@/components/calendarFormDemo";
import { getAllAssets } from "@/lib/services/assetsService";

export default function Home() {
  const [functionResponse, setFunctionResponse] = useState("");
  const [yahooFinanceResponse, setYahooFinanceResponse] = useState("");
  const handleClick = async () => {
    const response = await getAllAssets();
    if (response.success && response.data) {
      setFunctionResponse(response.data[0].buyDate);
    }
  };
  const handleClickYahooFinance = async (symbol: string) => {
    await getYahooFinanceData(symbol).then((result) => {
      if (!result.success && result.message) setYahooFinanceResponse(result.message.message);
      if (result.data) {
        setYahooFinanceResponse(result.data.key.chart.result[0].meta.currency);
      }
    });
  };

  return (
    <div id="root">
      <div className="text-slate-900 dark:text-slate-50 dark:bg-slate-800">
        <CalendarFormDemo />
        <CardDemo />
        <ChartDemo />
        <button onClick={handleClick}>Call Function</button>
        <p>api response: {functionResponse}</p>
        <button
        // onClick={handleClickYahooFinance}
        >
          Call Yahoo Fiance with a symbol :{" "}
        </button>
        <input
          className="dark:text-black"
          placeholder="AAPL"
          onChange={(e) => handleClickYahooFinance(e.target.value)}
        />
        <p>api response currency of symbol: {yahooFinanceResponse}</p>
      </div>
    </div>
  );
}

function toast(message: any) {
  throw new Error("Function not implemented.");
}
// function setYahooFinanceResponse(arg0: void | APIResult) {
//   throw new Error("Function not implemented.");
// }
