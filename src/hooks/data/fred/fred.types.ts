export type TSeriesId = "T10Y2Y" | "GDPCA" | "DGS10-T10YIE";

export interface IObservation {
  date: string;
  realtime_end: string;
  realtime_start: string;
  value: string;
}
export interface IObservationsResponse {
  count: number;
  file_type: "json";
  limit: number;
  observation_end: string;
  observation_start: string;
  offset: string;
  order_by: string;
  observations: IObservation[];
  realtime_end: string;
  realtime_start: string;
  sort_order: "asc" | "desc";
  units: "lin";
  output_type: 1;
}
