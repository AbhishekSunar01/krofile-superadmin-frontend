import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { XAxisTickFormatter } from "../../utils/XAxisTickFormatter";
import { YAxisNumberTickFormatter } from "../../utils/YAxisNumberTickFormatter";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "../ui/chart";

interface ILineChartProps {
  chartConfig: ChartConfig;
  chartData: { date: string; [key: string]: any }[];
  XAxisDataKey: string;
  chartLabels: string[];
  lineType?: "linear" | "monotone" | "natural" | "step";
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
          <span className="text-sm text-gray-700 capitalize">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: {
      date: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#000000] text-white p-2 rounded-md text-xs font-normal">
        <div className="mb-2">{payload[0].payload.date}</div>
        {payload.map((entry, index) => (
          <div
            key={`tooltip-item-${index}`}
            className="flex justify-start items-center gap-2"
          >
            <div
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="capitalize">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ReportLineChart = ({
  chartConfig,
  chartData,
  XAxisDataKey,
  chartLabels,
  lineType = "monotone", // Set default line type to 'monotone'
}: ILineChartProps) => {
  return (
    <div className="relative">
      <ChartContainer className="h-[330px] w-full" config={chartConfig}>
        <LineChart
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
            {/* Dynamically generate gradients for lines */}
            {chartLabels.map((label, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`color${index + 1}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5"
                  stopColor={`var(--color-${label})66`}
                  stopOpacity={1}
                />
                <stop
                  offset="95"
                  stopColor={`var(--color-${label})00`}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid vertical={true} />

          {/* Left Y-Axis only */}
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={24}
            tickFormatter={YAxisNumberTickFormatter}
            padding={{ top: 10 }}
            orientation="left"
          />

          {/* X-Axis */}
          <XAxis
            dataKey={XAxisDataKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value, index) => {
              return XAxisTickFormatter(value, index, chartData);
            }}
          />

          {/* Tooltip */}
          <ChartTooltip content={<CustomTooltip />} />

          {/* Dynamic Line components */}
          {chartLabels.map((label, index) => (
            <Line
              key={index}
              dataKey={label} // Dynamically set the dataKey based on chartLabels
              type={lineType}
              stroke={`var(--color-${label})`}
              strokeWidth={2}
              dot={false} // You can show dots on the line by changing to `true`
              activeDot={{ r: 8 }} // Active dot radius for hovered points
              yAxisId="left" // Assign all lines to the left Y-axis
            />
          ))}
        </LineChart>
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

export default ReportLineChart;
