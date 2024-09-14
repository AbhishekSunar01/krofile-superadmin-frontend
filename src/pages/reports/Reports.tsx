import { ChartConfig } from "../../components/ui/chart";
import PageLayout from "../../layout/PageLayout";

import ReportChart from "../../components/reports/AreaChart";
import ReportCard from "../../components/reports/ReportCard";
import activeUserGrowthChartDataJson from "../../json/dummyData/activeUserGrowthChartData.json";
// import retentionChartDataJson from "../../json/dummyData/retentionGrowthData.json";
import formatNumberWithCommas from "../../utils/formatNumberWithComma";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

export default function Reports() {
  const activeUserGrowthChartData: IChartData[] =
    activeUserGrowthChartDataJson.chartData;

  // const retentionChartData: IChartData[] = retentionChartDataJson.chartData;

  const activeUserChartLabels: string[] = ["Count"];
  // const retentionChartLabels: string[] = ["retentionrate", "retentiongrowth"];

  const activeUserGrowthChartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  // const retentionChartConfig = {
  //   retentionrate: {
  //     label: "retentionrate",
  //     color: "hsl(var(--chart-6))",
  //   },
  //   retentiongrowth: {
  //     label: "retentiongrowth",
  //     color: "hsl(var(--chart-2))",
  //   },
  // } satisfies ChartConfig;

  const findTotal = (data: IChartData[]): number => {
    const total = data.reduce((acc, curVal) => {
      const count = curVal.count || 0; // Handle cases where count might be undefined
      return acc + count;
    }, 0); // Initialize the accumulator to 0
    return total;
  };

  return (
    <PageLayout
      title="Reports"
      description="Gain comprehensive insights into platform performance, user engagement, and system health, empowering you to make data-driven decisions for optimal efficiency and growth."
    >
      <div className="grid grid-cols-4 gap-4">
        <ReportCard
          cardTitle="Active Users Growth Chart"
          cardLink="/reports"
          growthPercentage={
            activeUserGrowthChartDataJson.growthPercentage || "0"
          }
          total={
            formatNumberWithCommas(findTotal(activeUserGrowthChartData)) || 0
          }
          childrenComponent={
            <ReportChart
              chartConfig={activeUserGrowthChartConfig}
              chartData={activeUserGrowthChartData}
              XAxisDataKey={"date"}
              YAxisDataKey={"count"}
              areaType="natural"
              chartLabels={activeUserChartLabels}
            />
          }
        />

        {/* <ReportCard
          cardTitle="Retention Growth"
          cardLink="/reports"
          growthPercentage={
            activeUserGrowthChartDataJson.growthPercentage || "0"
          }
          // total={findTotal(activeUserGrowthChartData) || 0}
          childrenComponent={
            <ReportChart
              chartConfig={retentionChartConfig}
              chartData={retentionChartData}

              XAxisDataKey={"date"}
              YAxisDataKey={"retentionrate"}
              areaType="natural"
              chartLabels={retentionChartLabels}
            />
          }
        /> */}
      </div>
    </PageLayout>
  );
}
