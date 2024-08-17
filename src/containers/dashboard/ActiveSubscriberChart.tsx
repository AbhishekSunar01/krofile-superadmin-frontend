import { useMemo } from "react";
import { Label, Legend, LegendProps, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

interface PieComponentProps {
  pieData: { pieData: string; visitors: number }[];
  titleData: { title: string; subtitle?: string };
}

const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const CustomLegend: React.FC<LegendProps> = ({ payload }) => (
  <ul className="flex flex-col items-start space-y-5">
    {payload?.map((entry, index) => (
      <li key={`item-${index}`} className="flex items-center space-x-2">
        <span
          className="inline-block w-4 h-4 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-[18px] font-[400] text-[#525E6F]">
          {entry.value}
        </span>
      </li>
    ))}
  </ul>
);

const renderLabel = (viewBox: any, totalVisitors: number) => {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) - 10}
          className="fill-muted-foreground text-lg"
        >
          Total Value
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 20}
          className="fill-foreground text-3xl font-bold"
        >
          {totalVisitors.toLocaleString()}
        </tspan>
      </text>
    );
  }
  return null;
};

export function ActiveSubscriberChart({
  pieData,
  titleData,
}: PieComponentProps) {
  const dataWithColors = useMemo(
    () =>
      pieData.map((item, index) => ({
        ...item,
        fill: colorPalette[index % colorPalette.length],
      })),
    [pieData]
  );

  const totalVisitors = useMemo(
    () => dataWithColors.reduce((acc, curr) => acc + curr.visitors, 0),
    [dataWithColors]
  );

  return (
    <Card className="flex flex-col w-[480px]">
      <CardHeader className="items-center pb-0">
        <CardTitle className=" text-[16px] font-[500]">
          {titleData.title}
        </CardTitle>
        {titleData.subtitle && (
          <span className="text-xs text-muted-foreground">
            {titleData.subtitle}
          </span>
        )}
      </CardHeader>
      <CardContent className="flex items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="flex min-h-[250px] min-w-fit items-center"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dataWithColors}
              dataKey="visitors"
              nameKey="pieData"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => renderLabel(viewBox, totalVisitors)}
              />
            </Pie>
            <Legend
              content={<CustomLegend />}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
