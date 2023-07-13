import { IObservation, TSeriesId } from "@/hooks/data/fred/fred.types";
import { format, subYears } from "date-fns";
import type { EChartsOption } from "echarts";

export const chartConfig = {
  T10Y2Y(data: IObservation[]): EChartsOption {
    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          return `
                 ${format(
                   new Date(params[0].axisValueLabel),
                   "dd-MM-yyyy"
                 )} : ${
            isNaN(params[0].data[1]) ? "No data" : `${params[0].data[1]}%`
          }
                `;
        },
      },
      grid: {
        left: "3%",
        right: "7%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        name: "Time",
        boundaryGap: ["0%", "0%"],
        axisLabel: {
          formatter: (value: number) => {
            const formattedDate = format(new Date(value), "dd- MM - yyyy");
            return formattedDate;
          },
          hideOverlap: true,
        },
      },
      yAxis: {
        type: "value",
        name: "Percentage",
        boundaryGap: ["0%", "0%"],
      },
      dataZoom: [
        {
          type: "inside",
          minValueSpan: 3600 * 24 * 1000 * 9,
        },
        {
          type: "slider",
          labelFormatter(value) {
            return format(new Date(value), "dd-MM-yyyy");
          },
        },
      ],

      series: [
        {
          data: data.map((s) => [+new Date(s["date"]), s["value"]]),
          type: "line",
          symbol: "none",
          areaStyle: {},
          smooth: true,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
        },
      ],
    };
  },
  "DGS10-T10YIE"(data: IObservation[]): EChartsOption {
    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          return `
               ${format(new Date(params[0].axisValueLabel), "dd-MM-yyyy")} : ${
            isNaN(params[0].data[1]) ? "No data" : `${params[0].data[1]}%`
          }
              `;
        },
      },
      grid: {
        left: "3%",
        right: "7%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: ["0%", "0%"],
      },
      yAxis: {
        type: "value",

        boundaryGap: ["0%", "0%"],
      },
      dataZoom: [
        {
          type: "inside",
          minValueSpan: 3600 * 24 * 1000 * 10,
        },
        {
          type: "slider",
          labelFormatter(value) {
            return format(new Date(value), "dd-MM-yyyy");
          },
        },
      ],

      series: [
        {
          data: data.map((s) => [+new Date(s["date"]), s["value"]]),
          type: "line",
          symbol: "none",
          smooth: true,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
        },
      ],
    };
  },
  GDPCA(data: IObservation[]): EChartsOption {
    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          return `
               ${format(new Date(params[0].axisValueLabel), "dd-MM-yyyy")} : ${
            isNaN(params[0].data[1]) ? "No data" : `${params[0].data[1]}$B`
          }
              `;
        },
      },
      grid: {
        left: "3%",
        right: "7%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: ["0%", "0%"],
      },
      yAxis: {
        type: "value",
        name: "Billions of Chained 2012 Dollars",
        boundaryGap: ["0%", "0%"],
      },
      dataZoom: [
        {
          type: "inside",
          minValueSpan: 3600 * 24 * 1000 * 365 * 5,
        },
        {
          type: "slider",
          minValueSpan: 3600 * 24 * 1000 * 365 * 5,
          labelFormatter(value) {
            return format(new Date(value), "dd-MM-yyyy");
          },
        },
      ],

      series: [
        {
          data: data.map((s) => [s["date"], +s["value"]]),
          type: "bar",
        },
      ],
    };
  },
};

export const dates: Record<TSeriesId, { start: string; end: string }> = {
  T10Y2Y: {
    end: format(new Date(), "yyyy-MM-dd"),
    start: format(subYears(new Date(), 10), "yyyy-MM-dd"),
  },
  GDPCA: {
    end: format(new Date(), "yyyy-MM-dd"),
    start: format(subYears(new Date(), 20), "yyyy-MM-dd"),
  },
  "DGS10-T10YIE": {
    end: format(new Date(), "yyyy-MM-dd"),
    start: "2003-01-02",
  },
};
export const minStartDates: Record<TSeriesId, string> = {
  T10Y2Y: "1976-06-01",
  GDPCA: "1929-01-01",
  "DGS10-T10YIE": "2003-01-02",
};
