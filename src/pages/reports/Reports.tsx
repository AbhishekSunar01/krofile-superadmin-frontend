import { ChartConfig } from "../../components/ui/chart";
import PageLayout from "../../layout/PageLayout";

import {
  default as ReportAreaChart,
  default as ReportChart,
} from "../../components/reports/AreaChart";
import ReportCard from "../../components/reports/ReportCard";
import ReportTable from "../../components/reports/ReportTable";
import ReportStackedChart from "../../components/reports/StackedAreaChart";
import ActiveSubscribersDataJson from "../../json/dummyData/activeSubscribersData.json";
import activeUserGrowthChartDataJson from "../../json/dummyData/activeUserGrowthChartData.json";
import churnRateDataJson from "../../json/dummyData/churnRateData.json";
import retentionChartDataJson from "../../json/dummyData/retentionGrowthData.json";
import formatNumberWithCommas from "../../utils/formatNumberWithComma";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

export default function Reports() {
  const activeUserGrowthChartData: IChartData[] =
    activeUserGrowthChartDataJson.chartData;

  const ActiveSubscribersData: Record<string, any>[] =
    ActiveSubscribersDataJson.data;

  const churnRateData: IChartData[] = churnRateDataJson.chartData;

  const retentionChartData: IChartData[] = retentionChartDataJson.chartData;

  const activeUserChartLabels: string[] = ["Count"];
  const retentionChartLabels: string[] = ["retentionrate", "retentiongrowth"];
  const churnRateChartLabels: string[] = ["ChurnRate"];

  const activeUserGrowthChartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  const retentionChartConfig = {
    retentionrate: {
      label: "retentionrate",
      color: "#22D1EE",
    },
    retentiongrowth: {
      label: "retentiongrowth",
      color: "#DF0C3D",
    },
  } satisfies ChartConfig;

  const churnRateChartConfig = {
    churnrate: {
      label: "ChurnRate",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

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
      description="Gain comprehensive insights into platform performance, user engagement, and system health, empowering you to make data-driven decisions for optimal     efficiency and growth."
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
              tickFormatter={(value) => value / 1000 + "k"}
              gradientColors={{
                startColor: "#22D1EE66",
                endColor: "#85EEFF4D",
              }}
              strokeColor="#22D1EE"
            />
          }
        />
        <ReportCard
          cardTitle="Active Subscribers"
          cardLink="/reports"
          growthPercentage={ActiveSubscribersDataJson.growthPercentage || "0"}
          total={formatNumberWithCommas(ActiveSubscribersData.length) || 0}
          childrenComponent={
            <ReportTable
              data={ActiveSubscribersData}
              headings={["SL No", "Business Name", "Reg. Date", "Subs. Plan"]}
            />
          }
        />

        <ReportCard
          cardTitle="Retention Growth"
          cardLink="/reports"
          growthPercentage={
            activeUserGrowthChartDataJson.growthPercentage || "0"
          }
          // total={findTotal(activeUserGrowthChartData) || 0}
          childrenComponent={
            <ReportStackedChart
              chartConfig={retentionChartConfig}
              chartData={retentionChartData}
              XAxisDataKey={"date"}
              areaType="natural"
              chartLabels={retentionChartLabels}
            />
          }
        />
        <ReportCard
          cardTitle="Churn Rate"
          cardLink="/reports"
          growthPercentage={churnRateDataJson.growthPercentage || "0"}
          // total={findTotal(activeUserGrowthChartData) || 0}
          childrenComponent={
            <ReportAreaChart
              YAxisDataKey="churnrate"
              chartConfig={churnRateChartConfig}
              chartData={churnRateData}
              XAxisDataKey={"date"}
              areaType="linear"
              chartLabels={churnRateChartLabels}
              tickFormatter={(value) => value + "%"}
              gradientColors={{
                startColor: "#EE222266",
                endColor: "#FF858500",
              }}
              strokeColor="#EE2222"
            />
          }
        />
      </div>
    </PageLayout>
  );
}
