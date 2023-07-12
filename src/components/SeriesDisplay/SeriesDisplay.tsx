import {
  IObservation,
  IObservationsResponse,
  TSeriesId,
} from "@/hooks/data/fred/fred.types";
import { useGetObservationsById } from "@/hooks/data/fred/fredQueries.hooks";
import { Box } from "@/ui/Box";
import { Text } from "@/ui/Text";
import { chartConfig } from "@/lib/constants/chartsConfig";
import dynamic from "next/dynamic";
import DatePicker from "@/ui/DatePicker/DatePicker";

const Chart = dynamic(() => import("@/components/Charts/Chart"), {
  ssr: false,
});

interface IProps {
  title: string;
  series_id: TSeriesId;
}

const SeriesDisplay = ({ title, series_id }: IProps) => {
  const { data, isLoading } = useGetObservationsById({
    series_id,
  });
  return (
    <Box>
      <Text variant="titleLarge">{title}</Text>
      <Text>{title}</Text>
      <DatePicker />

      {isLoading ? (
        "Loading..."
      ) : data ? (
        <Box p={4} className="rounded-lg shadow" my={10} h="500px">
          <Chart options={chartConfig[series_id](data.observations)} />
        </Box>
      ) : (
        "Something went wrong..."
      )}
    </Box>
  );
};

export default SeriesDisplay;
