import { httpClient } from "@/lib/configs/axios";
import {
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { IObservationsResponse, TSeriesId } from "./fred.types";

export const fredQueryKeys = {
  all: [{ scope: "plots" }] as const,
  observationsById: ({ series_id }: { series_id: TSeriesId }) =>
    [{ ...fredQueryKeys.all[0], entity: "Observations by id", series_id }] as const,
  "DGS10-T10YIE": () =>
    [{ ...fredQueryKeys.all[0], entity: "DGS10-T10YIE" }] as const,
};

async function getObservationsById({
  queryKey: [{ series_id }],
}: QueryFunctionContext<ReturnType<(typeof fredQueryKeys)["observationsById"]>>) {

  const res = await httpClient.get("/api/observations", {
    params: { series_id },
  });
  return res.data;
}

async function DGS10minusT10YIEObservations() {
  const result = await Promise.all([httpClient.get<IObservationsResponse>(
    "DGS10.json",
  ), httpClient.get<IObservationsResponse>(
    "T10YIE.json",
  )])

  const DGS10Data = result[0].data.observations;

  const T10YIEData = result[1].data.observations;

  const data: IObservationsResponse['observations'] = [];

  for (let index = 0; index < DGS10Data.length; index++) {
    data.push({ ...DGS10Data[index], value: (parseFloat(DGS10Data[index].value) - parseFloat(T10YIEData[index].value)).toFixed(2) })
  }

  // const res = await httpClient.get("/series/observations", {
  //   params: { series_id },
  // });

  return { ...result[0].data, observations: data };
}

interface IGetObservationsProps {
  series_id: TSeriesId;
}

export const useGetObservationsById = <
  SelectData = IObservationsResponse,
  Error = unknown
>(
  { series_id }: IGetObservationsProps,
  options?: UseQueryOptions<
    IObservationsResponse,
    Error,
    SelectData,
    ReturnType<(typeof fredQueryKeys)["observationsById"]>
  >
) => {
  return useQuery<
    IObservationsResponse,
    Error,
    SelectData,
    ReturnType<(typeof fredQueryKeys)["observationsById"]>
  >(fredQueryKeys.observationsById({ series_id }), getObservationsById, options);
};



export const useGetDGS10minusT10YIEObservations = <
  SelectData = IObservationsResponse,
  Error = unknown
>(
  options?: UseQueryOptions<
    IObservationsResponse,
    Error,
    SelectData,
    ReturnType<(typeof fredQueryKeys)["DGS10-T10YIE"]>
  >
) => {
  return useQuery<
    IObservationsResponse,
    Error,
    SelectData,
    ReturnType<(typeof fredQueryKeys)["DGS10-T10YIE"]>
  >(fredQueryKeys["DGS10-T10YIE"](), DGS10minusT10YIEObservations, options);
};
