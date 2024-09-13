import { Link } from "react-router-dom";
import GrowthIndicator from "../assets/svg/growthindicator.svg";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import PageLayout from "../layout/PageLayout";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Reports() {
  const chartData = [
    { month: "January", desktop: 1000 },
    { month: "February", desktop: 2000 },
    { month: "March", desktop: 2343 },
    { month: "April", desktop: 5000 },
    { month: "May", desktop: 4500 },
    { month: "June", desktop: 3000 },
    { month: "June", desktop: 1000 },
    { month: "June", desktop: 4000 },
    { month: "June", desktop: 3000 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#22D1EE",
    },
  } satisfies ChartConfig;
  return (
    <PageLayout
      title="Reports"
      description="Gain comprehensive insights into platform performance, user engagement, and system health, empowering you to make data-driven decisions for optimal efficiency and growth."
    >
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="font-[400] font-inter text-[16px] flex justify-between items-center text-[#14181F]">
            <div>Active Users Growth Chart</div>
            <Link
              className="text-[#1E7BC8] text-[12px] underline capitalize underline-offset-2"
              to={"/reports"}
            >
              View All
            </Link>
          </CardTitle>
          <CardDescription className="flex select-none justify-start items-center gap-[2px]">
            <div className="text-[28px] text-[#14181F] font-inter font-[600]">
              16,345&nbsp;
            </div>
            <img
              src={GrowthIndicator}
              alt="Growth Indicator"
              className="inline-block"
            />
            <div className="text-[#14181F] text-[12px] font-[500] justify-center items-center inline-block">
              26%&nbsp;
            </div>
            <div className="text-[#1E7BC8] text-[12px] font-[400]">
              vs previous period&nbsp;
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 0,
              }}
              // className="absolute top-0 left-0 w-full h-full z-50"
            >
              <CartesianGrid vertical={true} />
              <YAxis
                dataKey={"desktop"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  return value / 1000 + "k";
                }}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.2}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </PageLayout>
  );
}
