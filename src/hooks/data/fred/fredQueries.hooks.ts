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
};

async function getObservationsById({
  queryKey: [{ series_id }],
}: QueryFunctionContext<ReturnType<(typeof fredQueryKeys)["observationsById"]>>) {

  const res = await httpClient.get("/api/observations", {
    params: { series_id },
  });
  return res.data;
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




