import {
  IObservation,
  IObservationsResponse,
} from "@/hooks/data/fred/fred.types";
import { Box } from "@/ui/Box";
import { Text } from "@/ui/Text";
import { ReactNode } from "react";

interface IProps {
  children: (data: IObservation[]) => ReactNode;
  title: string;
  series: IObservationsResponse | undefined;
  isLoading?: boolean;
}

const SeriesDisplay = ({ series, children, title, isLoading }: IProps) => {
  return (
    <Box>
      <Text variant="titleLarge">{title}</Text>
      <Text>{title}</Text>
      {isLoading ? "Loading..." : children(series!.observations)}
    </Box>
  );
};

export default SeriesDisplay;
