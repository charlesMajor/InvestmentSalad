import { getYahooFinanceData } from "@/lib/services/yahooFinanceService";
import { intervalList, rangeList } from "@/lib/utils/constants/selectArray";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AreaPlot, LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import React from "react";

interface StockSmallChartProps {
  symbol: string;
  intervalProp?: string;
  rangeProp?: string;
}

export default function StockSmallChart({ symbol, intervalProp, rangeProp }: StockSmallChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [indicators, setIndicators] = useState<any[]>([]);
  const [timestamp, setTimestamp] = useState<any[]>([]);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let interval: string | undefined = intervalProp ? intervalProp : "2m";
        let range: string | undefined = rangeProp ? rangeProp : "1d";
        range = rangeList.find((element) => element === range);
        interval = intervalList.find((element) => element === interval);
        if (range && interval) {
          const result = await getYahooFinanceData(symbol, range, interval);
          if (result.data) {
            const newIndicators = result.data.key.chart.result[0].indicators.quote[0].close;
            const newTimeStamp = result.data.key.chart.result[0].timestamp;
            const filteredArray1 = newIndicators.filter((value: string | null) => value !== null);
            const filteredArray2 = newTimeStamp.filter(
              (_: any, index: string | number) => newIndicators[index] !== null,
            );
            setIndicators(normalizeArray(filteredArray1));
            setTimestamp(filteredArray2);
          }
        }
      } catch (error) {
        //À changer
        console.error("Error fetching data:", error);
      }
    };

    function normalizeArray(arr: string[]) {
      const numbers = arr.map(Number);
      const smallestNumber = Math.min(...numbers);
      const normalizedArray = numbers.map((num) => num - smallestNumber);
      return normalizedArray;
    }

    if (indicators.length === 0 && timestamp.length === 0) {
      fetchData();
    }
  }, [indicators, timestamp]);

  useEffect(() => {
    const updateChartDimensions = () => {
      const chartContainer = chartContainerRef.current;
      if (chartContainer) {
        setChartDimensions({
          width: chartContainer.offsetWidth,
          height: chartContainer.offsetHeight - 10,
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
    const updateChart = () => {
      if (svgRef.current) {
        const svg = d3.select(svgRef.current);
        svg.selectAll("path").remove();
        const xScale = d3
          .scaleLinear()
          .domain([0, timestamp.length - 1])
          .range([0, chartDimensions.width]);
        const yScale = d3
          .scaleLinear()
          .domain([0, Math.max(...indicators)])
          .range([chartDimensions.height, 0]);

        const line = d3
          .line()
          .x((d, i) => xScale(i))
          .y((d) => yScale(Number(d)))
          .curve(d3.curveMonotoneX);

        svg
          .append("path")
          .data([indicators])
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "#1F93DB");
      }
    };

    updateChart();
  }, [indicators, timestamp, chartDimensions]);

  return (
    <div ref={chartContainerRef} className="h-full flex justify-center items-center">
      {indicators.length !== 0 && (
        <svg ref={svgRef} width={chartDimensions.width} height={chartDimensions.height}></svg>
      )}
    </div>
  );
}
