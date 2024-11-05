import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { XAxisTickFormatter } from "../../utils/XAxisTickFormatter";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "../ui/chart";

interface IReportBarChartProps {
  chartConfig: ChartConfig;
  chartData: { date: string; [key: number]: any }[];
  YAxisDataKey: string;
  chartLabels: string[];
  tickFormatter?: (value: number) => string;
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
            <span>
              {/* {entry.name}: */}
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ReportBarChart = ({
  chartConfig,
  chartData,
  YAxisDataKey,
  chartLabels,
  tickFormatter,
}: IReportBarChartProps) => {
  return (
    <div className="relative">
      <ChartContainer className="h-[330px] w-full" config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          {/* Custom Legend */}
          <ChartLegend
            verticalAlign="top"
            align="right"
            content={<CustomLegend />}
          />
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
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value, index) => {
              return XAxisTickFormatter(value, index, chartData);
            }}
          />

          {/* Tooltip */}
          <ChartTooltip content={<CustomTooltip />} />

          {/* <Bar dataKey="online" fill="var(--color-online)" radius={4} />
          <Bar dataKey="offline" fill="var(--color-offline)" radius={4} /> */}
          {/* Dynamic Bars */}
          {chartLabels.map((label, index) => (
            <Bar
              key={index}
              dataKey={label} // Dynamically set the dataKey based on chartLabels
              fill={`var(--color-${label})`} // Use dynamic color variables
              radius={4}
            />
          ))}
        </BarChart>
      </ChartContainer>
      {/* <div className="flex justify-between items-center pl-16">
        <div>2024-04-05</div>
        <div>Today</div>
      </div> */}
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

export default ReportBarChart;
