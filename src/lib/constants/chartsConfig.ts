import { IObservation, TSeriesId } from "@/hooks/data/fred/fred.types"
import { format, subYears } from "date-fns";
import type { EChartsOption } from "echarts";

export const chartConfig = {
    T10Y2Y(data: IObservation[]): EChartsOption {
        return {
            tooltip: {
                trigger: "axis",
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
                boundaryGap: ['0%', '0%']
            },
            yAxis: {
                type: "value",
                name: "Percentage",
                boundaryGap: ['0%', '0%']
            },
            dataZoom: [
                {
                    type: "inside",

                },
                { type: "slider", },
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
            },
            grid: {
                left: "3%",
                right: "7%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "time",
                boundaryGap: ['0%', '0%']
            },
            yAxis: {
                type: "value",

                boundaryGap: ['0%', '0%']
            },
            dataZoom: [
                {
                    type: "inside",
                    start: 0,
                    end: 100,
                },
                { type: "slider", start: 0, end: 100 },
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
            },
            grid: {
                left: "3%",
                right: "7%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "time",
                boundaryGap: ['0%', '0%']
            },
            yAxis: {
                type: "value", name: "Billions of Chained 2012 Dollars",
                boundaryGap: ['0%', '0%']
            },
            dataZoom: [
                {
                    type: "inside",
                },
                { type: "slider", end: 10 },
            ],

            series: [
                {
                    data: data.map((s) => [s["date"], +s["value"]]),
                    type: "bar",
                },
            ],
        }

    }
}

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