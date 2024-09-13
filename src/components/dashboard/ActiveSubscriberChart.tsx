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
} from "../../components/ui/chart";

interface PieComponentProps {
  pieData: { pieData: string; visitors: number }[];
  titleData: { title: string; subtitle?: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      pieData: string;
      visitors: number;
      fill: string;
    };
  }>;
}

const colorPalette = ["#90CAF9", "#A5D6A7", "#FFCC80", "#CE93D8"];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const CustomLegend: React.FC<LegendProps> = ({ payload }) => (
  <ul className="flex flex-col items-start space-y-4 -mr-2">
    {payload?.map((entry, index) => (
      <li key={`item-${index}`} className="flex items-center space-x-2">
        <span
          className="inline-block w-4 h-4 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-[14px] font-[400] text-dialogText">
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
          className="fill-muted-foreground text-base font-normal"
        >
          Total Value
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 20}
          className="fill-foreground text-2xl font-bold"
        >
          {totalVisitors.toLocaleString()}
        </tspan>
      </text>
    );
  }
  return null;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
  if (payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#000000] text-white p-2 rounded-md text-xs font-normal">
        <div className="flex items-center space-x-2  ">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: data.fill }}
          />
          <span>{data.pieData}</span>
        </div>
        <div className="ml-6">Count: {data.visitors}</div>
      </div>
    );
  }
  return null;
};

export default function ActiveSubscriberChart({
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
    <Card className="flex flex-col h-[265px] min-w-[400px]">
      <CardHeader className="items-start pt-4 pb-2">
        <CardTitle className="text-left text-[16px] font-[500]">
          {titleData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center -mt-2">
        <ChartContainer
          config={chartConfig}
          className="flex w-full items-center "
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={dataWithColors}
              dataKey="visitors"
              nameKey="pieData"
              innerRadius={50}
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
