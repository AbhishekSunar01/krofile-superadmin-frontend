import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface IAreaChartProps {
  chartConfig: ChartConfig;
  chartData: { date: string; [key: number]: any }[];
  XAxisDataKey: string;
  YAxisDataKey: string;
  chartLabels: string[];
  areaType?: "linear" | "monotone" | "natural" | "step";
  tickFormatter?: (value: number) => string;
  gradientColors: {
    startColor: string;
    endColor: string;
  };
  strokeColor: string;
}

const ReportAreaChart = ({
  chartConfig,
  chartData,
  XAxisDataKey,
  YAxisDataKey,
  chartLabels,
  tickFormatter,
  areaType = "natural", // Set a default value for areaType
  gradientColors,
  strokeColor,
}: IAreaChartProps) => {
  const firstLabel = chartLabels[0]?.toLowerCase() || "data";

  // Generate a unique ID for each chart gradient based on the chart label
  const gradientId = `colorData-${firstLabel}`;

  return (
    <div className="relative">
      <ChartContainer className="h-[330px] w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 0,
          }}
          className=""
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={`${gradientColors.startColor}`}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={`${gradientColors.endColor}`}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={true} />

          <YAxis
            dataKey={YAxisDataKey}
            tickLine={false}
            axisLine={false}
            tickMargin={24}
            tickFormatter={tickFormatter}
            padding={{ top: 10 }}
          />

          <XAxis
            dataKey={XAxisDataKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }
                formatter={(value) => [
                  `${firstLabel.toLocaleUpperCase()}: ${value}`,
                ]}
              />
            }
          />

          <Area
            dataKey={firstLabel}
            type={areaType}
            stroke={strokeColor}
            fillOpacity={0.6}
            fill={`url(#${gradientId})`} // Use the unique gradient ID here
          />
        </AreaChart>
      </ChartContainer>
      {chartData.length === 0 && (
        <div className="flex w-full h-full items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
      {chartData.length === 0 && (
        <>
          <div className="absolute top-0 left-0 w-full">
            <div className="grid grid-rows-7 grid-cols-8 w-full">
              {
                // Add a placeholder for the chart
                Array.from({ length: 8 * 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="border h-[46px] bg-white border-gray-100"
                  ></div>
                ))
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportAreaChart;
