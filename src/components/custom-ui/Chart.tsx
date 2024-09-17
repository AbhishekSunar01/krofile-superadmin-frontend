import * as React from "react";
import { CartesianGrid, AreaChart, XAxis, YAxis, Area } from "recharts";

import { Card, CardContent } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

import growth from "../../assets/svg/growth.svg";

interface ChartProps {
  chartData: { date: string; data: number }[];
  title: string;
  tooltipData: string;
  className?: string;
}

const chartConfig = {
  data: {
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export default function Chart({
  chartData,
  title,
  tooltipData,
  className = "",
}: ChartProps) {
  const totalData = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.data, 0),
    [chartData]
  );

  return (
    <div className={className}>
      <Card className="flex flex-col h-full">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-5">
          <div className="font-normal text-sm">{title}</div>
          <div className="flex items-center gap-x-2">
            <span className="text-base font-semibold leading-none ">
              {totalData.toLocaleString()}{" "}
            </span>{" "}
            <span className="text-xs flex items-center text-primary gap-1 ">
              {" "}
              <img
                src={growth}
                alt="growth"
                className="bg-accentGreen p-1 rounded-full"
              />{" "}
              <span className="text-accentGreen">26%</span>
              vs previous period
            </span>
          </div>
        </div>
        <CardContent className="px-2 sm:p-6 flex flex-col items-center justify-center">
          {" "}
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <defs>
                <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-data)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-data)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={35}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    // className="w-fit text-[12px]"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                    formatter={(value) => [` ${tooltipData}: ${value}`]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="data"
                stroke={`var(--color-data)`}
                fillOpacity={1}
                fill="url(#colorData)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
