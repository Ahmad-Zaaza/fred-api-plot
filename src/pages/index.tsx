import SeriesDisplay from "@/components/SeriesDisplay/SeriesDisplay";

export default function Home() {
  return (
    <div className="max-w-[1366px] p-8 container mx-auto">
      <div className="flex flex-col gap-8">
        <SeriesDisplay
          series_id="T10Y2Y"
          title=" 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant
          Maturity (T10Y2Y)"
        />
        <SeriesDisplay
          series_id="GDPCA"
          title="Real Gross Domestic Product (GDPCA)"
        />
        <SeriesDisplay
          series_id="DGS10-T10YIE"
          title="Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity
          (DGS10) Minus 10-Year Breakeven Inflation Rate (T10YIE)"
        />
      </div>
    </div>
  );
}
