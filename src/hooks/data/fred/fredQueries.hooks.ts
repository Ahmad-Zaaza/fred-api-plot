import { httpClient } from "@/lib/configs/axios";
import {
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { IObservationsResponse, TSeriesId } from "./fred.types";

export const fredQueryKeys = {
  all: [{ scope: "plots" }] as const,
  observationsById: ({ series_id, observation_end, observation_start }: IGetObservationsProps) =>
    [{ ...fredQueryKeys.all[0], entity: "Observations by id", series_id, observation_end, observation_start }] as const,
};

async function getObservationsById({
  queryKey: [{ series_id, observation_end, observation_start }],
}: QueryFunctionContext<ReturnType<(typeof fredQueryKeys)["observationsById"]>>) {

  const res = await httpClient.get("/api/observations", {
    params: { series_id, observation_start, observation_end },
  });
  return res.data;
}


interface IGetObservationsProps {
  series_id: TSeriesId;
  observation_start?: string;
  observation_end?: string;
}

export const useGetObservationsById = <
  SelectData = IObservationsResponse,
  Error = unknown
>(
  { series_id, observation_end, observation_start }: IGetObservationsProps,
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
  >(fredQueryKeys.observationsById({ series_id, observation_end, observation_start }), getObservationsById, options);
};




