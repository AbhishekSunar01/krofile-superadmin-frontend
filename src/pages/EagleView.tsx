import EagleViewCard from "../components/eagle-view/EagleViewCard";
import ReportAreaChart from "../components/reports/AreaChart";
import ReportTable from "../components/reports/ReportTable";
import { ChartConfig } from "../components/ui/chart";
import ActiveSubscribersDataJson from "../json/dummyData/activeSubscribersData.json";
import activeUserGrowthChartDataJson from "../json/dummyData/activeUserGrowthChartData.json";
import PageLayout from "../layout/PageLayout";
import formatNumberWithCommas from "../utils/formatNumberWithComma";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

export default function EagleView() {
  const activeUserGrowthChartData: IChartData[] =
    activeUserGrowthChartDataJson.chartData;

  const ActiveSubscribersData: Record<string, any>[] =
    ActiveSubscribersDataJson.data;
  const activeUserChartLabels: string[] = ["Count"];

  const activeUserGrowthChartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-6))",
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
      title="EagleView"
      description="Eagle's View integrates visitor data from all businesses into a single, consolidated view. Monitor overall trends, enhance strategies, and make informed decisions with this powerful tool, driving growth and efficiency toward future success."
    >
      <div className="grid grid-cols-4 gap-4">
        <EagleViewCard
          cardTitle="Overall Visitors"
          growthPercentage={
            activeUserGrowthChartDataJson.growthPercentage || "0"
          }
          total={
            formatNumberWithCommas(findTotal(activeUserGrowthChartData)) || 0
          }
          childrenComponent={
            <ReportAreaChart
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

        <EagleViewCard
          cardTitle="Review Platforms visits"
          growthPercentage={ActiveSubscribersDataJson.growthPercentage || "0"}
          total={formatNumberWithCommas(ActiveSubscribersData.length) || 0}
          childrenComponent={
            <ReportTable
              data={ActiveSubscribersData}
              headings={["Business Name", "Reg. Date", "Subs. Plan"]}
              dataKeys={["businessName", "date", "plan"]}
              dataPerPage={5}
              paginationType="withoutNumber"
            />
          }
        />
      </div>
    </PageLayout>
  );
}
