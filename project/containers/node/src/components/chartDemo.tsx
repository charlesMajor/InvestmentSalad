import React, { useRef, useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";
import { getYahooFinanceData } from "@/lib/services/yahooFinanceService";
import { intervalList, rangeList } from "@/lib/utils/constants/selectArray";

// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from '@mui/charts';

export default function ChartDemo() {
  const { t } = useTranslation();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateChartDimensions = () => {
      const chartContainer = chartContainerRef.current;
      if (chartContainer) {
        setChartDimensions({
          width: chartContainer.offsetWidth,
          height: chartContainer.offsetHeight,
        });
      }
    };

    // Update dimensions initially and on window resize
    updateChartDimensions();
    window.addEventListener("resize", updateChartDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  return (
    <>
      <div
        ref={chartContainerRef}
        className="w-[60%] h-96 flex items-center justify-center bg-red-200 dark:bg-red-900 rounded-2xl"
      >
        <LineChart
          xAxis={[{ data: [1, 2, 3 /* ... */] }]}
          series={[
            {
              data: [145, 143 /* ... */],
              showMark: false,
            },
          ]}
          // You can use static or dynamic values here
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </div>
      <HistoryOfATD />
      <HistoryOfStock />
      {/* <LastDayOfATDAndAAPL />
      <AllTimeOfATDAndAAPL /> */}
    </>
  );
}

function HistoryOfStock() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [indicators, setIndicators] = useState<any[]>([]);
  const [timestamp, setTimestamp] = useState<any[]>([]);
  const [selectedInterval, setSelectedInterval] = useState(intervalList[0]);
  const [selectedRange, setSelectedRange] = useState(rangeList[0]);

  const handleChangeInterval = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedInterval(event.target.value);
    setIndicators([]);
    setTimestamp([]);
    fetchData();
  };

  const handleChangeRange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedRange(event.target.value);
    setIndicators([]);
    setTimestamp([]);
    fetchData();
  };

  useEffect(() => {
    const updateChartDimensions = () => {
      const chartContainer = chartContainerRef.current;
      if (chartContainer) {
        setChartDimensions({
          width: chartContainer.offsetWidth,
          height: chartContainer.offsetHeight,
        });
      }
    };

    updateChartDimensions();
    window.addEventListener("resize", updateChartDimensions);

    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  const fetchData = async () => {
    try {
      let interval: string | undefined = selectedInterval;
      let range: string | undefined = selectedRange;
      range = rangeList.find((element) => element === range);
      interval = intervalList.find((element) => element === interval);
      if (range && interval) {
        const result = await getYahooFinanceData("ATD.TO", range, interval);
        // let newData: any[] = [];
        if (result.data) {
          //newData = result.data.map((item: any) => ({ ...item }));
          setIndicators(result.data.key.chart.result[0].indicators.quote[0].close);
          // setIndicators(result.data.key.chart.result[0].indicators.adjclose[0].adjclose);
          setTimestamp(result.data.key.chart.result[0].timestamp);
        }
      }
    } catch (error) {
      //À changer
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <p>Choose something...</p>
      <div className="flex flex-row">
        <p>Interval</p>
        <select id="intervalSelect" value={selectedInterval} onChange={handleChangeInterval}>
          {intervalList.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <p>Range</p>
        <select id="rangeSelect" value={selectedRange} onChange={handleChangeRange}>
          {rangeList.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div
        ref={chartContainerRef}
        className="w-[60%] h-96 flex items-center justify-center bg-red-200 dark:bg-red-900 rounded-2xl"
      >
        <LineChart
          xAxis={[{ data: timestamp }]}
          series={[
            {
              data: indicators,
              showMark: false,
            },
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </div>
    </>
  );
}

function HistoryOfATD() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [indicators, setIndicators] = useState<any[]>([]);
  const [timestamp, setTimestamp] = useState<any[]>([]);

  useEffect(() => {
    const updateChartDimensions = () => {
      const chartContainer = chartContainerRef.current;
      if (chartContainer) {
        setChartDimensions({
          width: chartContainer.offsetWidth,
          height: chartContainer.offsetHeight,
        });
      }
    };

    updateChartDimensions();
    window.addEventListener("resize", updateChartDimensions);

    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let interval: string | undefined = "3mo";
        let range: string | undefined = "max";
        range = rangeList.find((element) => element === range);
        interval = intervalList.find((element) => element === interval);
        if (range && interval) {
          const result = await getYahooFinanceData("ATD.TO", range, interval);
          // let newData: any[] = [];
          if (result.data) {
            //newData = result.data.map((item: any) => ({ ...item }));
            setIndicators(result.data.key.chart.result[0].indicators.quote[0].close);
            // setIndicators(result.data.key.chart.result[0].indicators.adjclose[0].adjclose);
            setTimestamp(result.data.key.chart.result[0].timestamp);
          }
        }
      } catch (error) {
        //À changer
        console.error("Error fetching data:", error);
      }
    };

    if (indicators.length === 0 && timestamp.length === 0) {
      fetchData();
    }
  }, [indicators, timestamp]);

  return (
    <>
      <p>The history of ATD.TO</p>
      <div
        ref={chartContainerRef}
        className="w-[60%] h-96 flex items-center justify-center bg-red-200 dark:bg-red-900 rounded-2xl"
      >
        <LineChart
          xAxis={[{ data: timestamp }]}
          series={[
            {
              data: indicators,
              showMark: false,
            },
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </div>
    </>
  );
}

function LastDayOfATDAndAAPL() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [indicatorsATD, setIndicatorsATD] = useState<any[]>([]);
  const [indicatorsAAPL, setIndicatorsAAPL] = useState<any[]>([]);
  const [timestamp, setTimestamp] = useState<any[]>([]);

  useEffect(() => {
    const updateChartDimensions = () => {
      const chartContainer = chartContainerRef.current;
      if (chartContainer) {
        setChartDimensions({
          width: chartContainer.offsetWidth,
          height: chartContainer.offsetHeight,
        });
      }
    };

    updateChartDimensions();
    window.addEventListener("resize", updateChartDimensions);

    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  const calculatePercentageChange = (prices: number[]) => {
    return prices.map((price: number, index: number) => {
      if (index === 0) {
        return 0; // First day has no percentage change
      } else {
        return ((price - prices[index - 1]) / prices[index - 1]) * 100;
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let interval: string | undefined = "2m";
        let range: string | undefined = "1d";
        range = rangeList.find((element) => element === range);
        interval = intervalList.find((element) => element === interval);
        if (range && interval) {
          const resultATD = await getYahooFinanceData("ATD.TO", range, interval);
          const resultAAPL = await getYahooFinanceData("AAPL", range, interval);
          let dataATD = [];
          let dataAAPL = [];
          if (resultATD.data) {
            // console.log(result.data.key.chart.result[0].indicators.quote[0].close);
            dataATD = resultATD.data.key.chart.result[0].indicators.quote[0].close;
          }
          if (resultAAPL.data) {
            dataAAPL = resultAAPL.data.key.chart.result[0].indicators.quote[0].close;
            setTimestamp(resultAAPL.data.key.chart.result[0].timestamp);
          }
          setIndicatorsATD(calculatePercentageChange(dataATD));
          setIndicatorsAAPL(calculatePercentageChange(dataAAPL));
        }
      } catch (error) {
        //À changer
        console.error("Error fetching data:", error);
      }
    };

    if (indicatorsAAPL.length === 0 && indicatorsATD.length === 0 && timestamp.length === 0) {
      fetchData();
    }
  }, [indicatorsAAPL, indicatorsATD, timestamp]);

  return (
    <>
      <p>Day difference between APPL and ATD</p>
      <div
        ref={chartContainerRef}
        className="w-[60%] h-96 flex items-center justify-center bg-red-200 dark:bg-red-900 rounded-2xl"
      >
        <LineChart
          xAxis={[{ data: timestamp }]}
          series={[
            {
              data: indicatorsATD,
              showMark: false,
            },
            {
              data: indicatorsAAPL,
              showMark: false,
            },
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </div>
    </>
  );
}

function AllTimeOfATDAndAAPL() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [indicatorsATD, setIndicatorsATD] = useState<any[]>([]);
  const [indicatorsAAPL, setIndicatorsAAPL] = useState<any[]>([]);
  const [timestamp, setTimestamp] = useState<any[]>([]);

  useEffect(() => {
    const updateChartDimensions = () => {
      const chartContainer = chartContainerRef.current;
      if (chartContainer) {
        setChartDimensions({
          width: chartContainer.offsetWidth,
          height: chartContainer.offsetHeight,
        });
      }
    };

    updateChartDimensions();
    window.addEventListener("resize", updateChartDimensions);

    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  function padArraysToEqualLength(array1: any[], array2: any[]) {
    const maxLength = Math.max(array1.length, array2.length);

    const paddedArray1 = Array.from({ length: maxLength }, (_, index) => array1[index] || null);
    const paddedArray2 = Array.from({ length: maxLength }, (_, index) => array2[index] || null);

    return [paddedArray1, paddedArray2];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let interval: string | undefined = "3mo";
        let range: string | undefined = "max";
        range = rangeList.find((element) => element === range);
        interval = intervalList.find((element) => element === interval);
        if (range && interval) {
          const resultATD = await getYahooFinanceData("ATD.TO", range, interval);
          const resultAAPL = await getYahooFinanceData("AAPL", range, interval);
          let dataATD = [];
          let dataAAPL = [];
          if (resultATD.data) {
            // console.log(result.data.key.chart.result[0].indicators.quote[0].close);
            dataATD = resultATD.data.key.chart.result[0].indicators.quote[0].close;
          }
          if (resultAAPL.data) {
            dataAAPL = resultAAPL.data.key.chart.result[0].indicators.quote[0].close;
            setTimestamp(resultAAPL.data.key.chart.result[0].timestamp);
          }
          setIndicatorsATD(padArraysToEqualLength(dataATD, dataAAPL)[1]);
          setIndicatorsAAPL(padArraysToEqualLength(dataATD, dataAAPL)[1]);
        }
      } catch (error) {
        //À changer
        console.error("Error fetching data:", error);
      }
    };

    if (indicatorsAAPL.length === 0 && indicatorsATD.length === 0 && timestamp.length === 0) {
      fetchData();
    }
  }, [indicatorsAAPL, indicatorsATD, timestamp]);

  return (
    <>
      <p>All time Day difference between APPL and ATD</p>
      <div
        ref={chartContainerRef}
        className="w-[60%] h-96 flex items-center justify-center bg-red-200 dark:bg-red-900 rounded-2xl"
      >
        <LineChart
          xAxis={[{ data: timestamp }]}
          series={[
            {
              data: indicatorsATD,
              showMark: false,
            },
            {
              data: indicatorsAAPL,
              showMark: false,
            },
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </div>
    </>
  );
}

// const MyChart = () => {
//   const data1 = [
//     { name: "Jan", value: 30 },
//     { name: "Feb", value: 40 },
//     { name: "Mar", value: 25 },
//     // Add more data points as needed
//   ];

//   const data2 = [
//     { name: "Jan", value: 20 },
//     { name: "Feb", value: 35 },
//     { name: "Mar", value: 45 },
//     // Add more data points as needed
//   ];

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={[data1, data2]}>
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="value" stroke="#8884d8" name="Data Line 1" />
//         <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Data Line 2" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default MyChart;
