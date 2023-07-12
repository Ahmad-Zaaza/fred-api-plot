import SeriesDisplay from "@/components/SeriesDisplay/SeriesDisplay";
import { Box } from "@/ui/Box";
import { chartConfig } from "@/lib/constants/chartsConfig";
import { Text } from "@/ui/Text";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <div className="max-w-[1366px] container mx-auto">
      <div className="grid grid-cols-1 gap-8 p-8">
        <SeriesDisplay
          series_id="T10Y2Y"
          title=" 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant
          Maturity (T10Y2Y)"
        />

        <SeriesDisplay
          series_id="GDPCA"
          title="Real Gross Domestic Product (GDPCA)"
        />

        <Box h="500px">
          <Text variant="displaySmall"></Text>
          <SeriesDisplay
            series_id="DGS10-T10YIE"
            title="Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity
          (DGS10) Minus 10-Year Breakeven Inflation Rate (T10YIE)"
          />
        </Box>
      </div>
    </div>
  );
}
