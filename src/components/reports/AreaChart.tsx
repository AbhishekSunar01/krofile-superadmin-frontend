// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "../ui/chart";

// interface IAreaChartProps {
//   chartConfig: ChartConfig;
//   chartData: { date: string; [key: number]: any }[];
//   XAxisDataKey: string;
//   YAxisDataKey: string;
//   chartLabels: string[];
//   areaType?: "linear" | "monotone" | "natural" | "step";
//   tickFormatter?: (value: number) => string;
//   gradientColors: {
//     startColor: string;
//     endColor: string;
//   };
// }

// const ReportAreaChart = ({
//   chartConfig,
//   chartData,
//   XAxisDataKey,
//   YAxisDataKey,
//   chartLabels,
//   tickFormatter,
//   areaType = "natural", // Set a default value for areaType
//   gradientColors,
// }: IAreaChartProps) => {
//   const firstLabel = chartLabels[0]?.toLowerCase() || "data";
//   console.log("gradientColors", gradientColors);


//   return (
//     <>
//       <ChartContainer className="h-[330px] w-full" config={chartConfig}>
//         <AreaChart
//           accessibilityLayer
//           data={chartData}
//           margin={{
//             left: 0,
//             right: 0,
//           }}
//           className=""
//         >
//           <defs>
//             <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
//               <stop
//                 offset="5%"
//                 stopColor={`${gradientColors.startColor}`}
//                 stopOpacity={0.8}
//               />
//               <stop
//                 offset="95%"
//                 stopColor={`${gradientColors.endColor}`}
//                 stopOpacity={0.1}
//               />
//             </linearGradient>
//             {/* <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
//               <stop
//                 offset="5%"
//                 stopColor={`var(--color-${firstLabel})`}
//                 stopOpacity={0.8}
//               />
//               <stop
//                 offset="95%"
//                 stopColor={`var(--color-${firstLabel})`}
//                 stopOpacity={0.1}
//               />
//             </linearGradient> */}
//           </defs>
//           <CartesianGrid vertical={true} />

//           <YAxis
//             dataKey={YAxisDataKey}
//             tickLine={false}
//             axisLine={false}
//             tickMargin={24}
//             // tickFormatter={(value) => value / 1000 + "k"}
//             tickFormatter={tickFormatter}
//             padding={{ top: 10 }}
//           />

//           <XAxis
//             dataKey={XAxisDataKey}
//             tickLine={false}
//             axisLine={false}
//             tickMargin={8}
//             tickFormatter={(value) => {
//               const date = new Date(value);
//               return date.toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               });
//             }}
//           />

//           <ChartTooltip
//             content={
//               <ChartTooltipContent
//                 indicator="dot"
//                 labelFormatter={(value) =>
//                   new Date(value).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })
//                 }
//                 formatter={(value) => [`${firstLabel}: ${value}`]}
//               />
//             }
//           />

//           {/* Refactor Area */}
//           <Area
//             dataKey={firstLabel}
//             type={areaType}
//             stroke={`var(--color-${firstLabel})`}
//             fillOpacity={0.6}
//             fill="url(#colorData)"
//           />
//         </AreaChart>
//       </ChartContainer>
//     </>
//   );
// };

// export default ReportAreaChart;


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
                formatter={(value) => [`${firstLabel.toLocaleUpperCase()}: ${value}`]}
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
    </>
  );
};

export default ReportAreaChart;
