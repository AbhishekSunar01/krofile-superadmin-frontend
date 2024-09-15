import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "../ui/chart";

interface IAreaChartProps {
  chartConfig: ChartConfig;
  chartData: { date: string; [key: string]: any }[];
  XAxisDataKey: string;
  chartLabels: string[];
  areaType?: "linear" | "monotone" | "natural" | "step";
}

interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <div className="flex justify-end -mt-[45px] items-center gap-4 mb-4 w-full">
      {payload?.map((entry, index) => (
        <div key={`legend-item-${index}`} className="flex items-center gap-2">
          <div
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-700">{entry.value}(%)</span>
        </div>
      ))}
    </div>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      date: string;
      retentionrate: number;
      retentiongrowth: number;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#000000] text-white p-2 rounded-md text-xs font-normal">
        <div className="mb-2">{payload[0].payload.date}</div>
        <div className="flex justify-start items-center gap-2">
          <div
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-retentionrate)" }}
          ></div>
          {payload[0].payload.retentionrate}%
        </div>

        <div className="flex justify-start items-center gap-2">
          <div
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-retentiongrowth)" }}
          ></div>
          {payload[1].payload.retentiongrowth}
        </div>
      </div>
    );
  }
  return null;
};

const ReportStackedChart = ({
  chartConfig,
  chartData,
  XAxisDataKey,
  chartLabels,
  areaType = "natural",
}: IAreaChartProps) => {
  return (
    <>
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
          {/* Custom Legend */}
          <ChartLegend
            verticalAlign="top"
            align="right"
            content={<CustomLegend />}
          />

          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22D1EE66" stopOpacity={1} />
              <stop offset="95%" stopColor="#85EEFF00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EE222266" stopOpacity={1} />
              <stop offset="95%" stopColor="#FF858500" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={true} />
          {/* <ChartLegend  /> */}

          {/* Left Y-Axis */}
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={24}
            tickFormatter={(value) => value + "%"}
            padding={{ top: 10 }}
            orientation="left"
          />

          {/* Right Y-Axis */}

          <YAxis
            yAxisId="right"
            tickLine={false}
            axisLine={false}
            tickMargin={24}
            padding={{ top: 10 }}
            orientation="right"
          />

          {/* X-Axis */}
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

          {/* Tooltip */}
          <ChartTooltip content={<CustomTooltip />} />

          {/* Stack areas */}

          <Area
            dataKey={chartLabels[0]}
            type={areaType}
            stroke={`var(--color-${chartLabels[0]})`}
            fillOpacity={1}
            fill={`url(#color1)`}
            yAxisId={"left"} // Assign to left or right Y-axis
          />
          <Area
            dataKey={chartLabels[1]}
            type={areaType}
            stroke={`var(--color-${chartLabels[1]})`}
            fillOpacity={1}
            fill={`url(#color2)`}
            yAxisId={"right"} // Assign to left or right Y-axis
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
};

export default ReportStackedChart;