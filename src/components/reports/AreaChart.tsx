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
}

const ReportAreaChart = ({
  chartConfig,
  chartData,
  XAxisDataKey,
  YAxisDataKey,
  chartLabels,
  areaType = "natural", // Set a default value for areaType
}: IAreaChartProps) => {
  const firstLabel = chartLabels[0]?.toLowerCase() || "data";

  return (
    <>
      <ChartContainer
        className="aspect-auto h-[300px] w-full"
        config={chartConfig}
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 0,
          }}
        >
          <defs>
            <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={`var(--color-${firstLabel})`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${firstLabel})`}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={true} />

          <YAxis
            dataKey={YAxisDataKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value / 1000 + "k"}
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
                formatter={(value) => [`${firstLabel}: ${value}`]}
              />
            }
          />

          {/* Refactor Area */}
          <Area
            dataKey={firstLabel}
            type={areaType}
            stroke={`var(--color-${firstLabel})`}
            fillOpacity={0.6}
            fill="url(#colorData)"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
};

export default ReportAreaChart;
