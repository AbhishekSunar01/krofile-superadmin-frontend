import * as React from "react";
import { CartesianGrid, AreaChart, XAxis, YAxis, Area } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface UsersGrowthProps {
  chartData: { date: string; desktop: number }[];
  titleData: { title: string; subtitle?: string };
}

const chartConfig = {
  desktop: {
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function UsersGrowth({
  chartData,
  titleData,
}: UsersGrowthProps) {
  const totalDesktop = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.desktop, 0),
    [chartData]
  );

  return (
    <div className="flex items-center justify-center">
      <Card className="flex flex-col w-[450px]">
        <CardHeader className="flex flex-col items-center space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>{titleData.title}</CardTitle>
            <div className="flex items-center gap-x-5">
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {totalDesktop.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground"></span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6 flex items-center justify-center">
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
                <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
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
                    className="max-w-[150px] text-[16px]"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                    formatter={(value) => [` Count: ${value}`]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="desktop"
                stroke={`var(--color-desktop)`}
                fillOpacity={1}
                fill="url(#colorDesktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
