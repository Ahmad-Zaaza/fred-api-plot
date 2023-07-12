import { TSeriesId } from "@/hooks/data/fred/fred.types";
import { useGetObservationsById } from "@/hooks/data/fred/fredQueries.hooks";
import { Box } from "@/ui/Box";
import { Text } from "@/ui/Text";
import { chartConfig, dates } from "@/lib/constants/chartsConfig";
import dynamic from "next/dynamic";
import { Stack } from "@/ui/Stack";
import { Spinner } from "@/ui/Spinner";
import DatePicker from "@/ui/DatePicker/DatePicker";
import { useState } from "react";
const Chart = dynamic(() => import("@/components/Charts/Chart"), {
  ssr: false,
});

interface IProps {
  title: string;
  series_id: TSeriesId;
}

const SeriesDisplay = ({ title, series_id }: IProps) => {
  // Ideally, would be coming with the data source
  const [date, setDate] = useState(dates[series_id]);
  const { data, isLoading, isError } = useGetObservationsById({
    series_id,
    observation_start: date.start,
    observation_end: date.end,
  });
  return (
    <Box>
      <Text variant="titleLarge">{title}</Text>
      <Stack mt={4} justifyContent="flex-end" gap={2} alignItems="center">
        <DatePicker
          value={new Date(date.start)}
          onChange={(_, dateString) => {
            setDate((prev) => ({ ...prev, start: dateString }));
          }}
        />
        <Text>to</Text>
        <DatePicker
          value={new Date(date.end)}
          onChange={(_, dateString) => {
            setDate((prev) => ({ ...prev, end: dateString }));
          }}
        />
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        p={4}
        className="rounded-lg shadow"
        my={4}
        h="500px"
      >
        {isLoading ? (
          <Spinner size={50} />
        ) : isError ? (
          "Something went wrong"
        ) : (
          <Chart options={chartConfig[series_id](data.observations)} />
        )}
      </Stack>
    </Box>
  );
};

export default SeriesDisplay;
