import ReportAreaChart from "../../components/reports/AreaChart";
import ReportCard from "../../components/reports/ReportCard";
import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import { ChartConfig } from "../../components/ui/chart";
import activeUserGrowthChartDataJson from "../../json/dummyData/activeUserGrowthChartData.json";
import activeUserGrowthTableData from "../../json/dummyData/activeUserGrowthTableData.json";
import formatNumberWithCommas from "../../utils/formatNumberWithComma";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

const IndustryTypePage = () => {
  const activeUserGrowthChartData: IChartData[] =
    activeUserGrowthChartDataJson.chartData;

  const activeUserChartLabels: string[] = ["Count"];

  const activeUserGrowthChartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  interface ChartData {
    date: string;
    [key: string]: number | string; // Allows for dynamic country keys
  }

  const findTotalSum = (chartData: ChartData[]): number => {
    return chartData.reduce((totalSum, dataEntry) => {
      // Loop through each key in the dataEntry object
      for (const key in dataEntry) {
        // Skip the "date" key and only sum numerical values (country data)
        if (key !== "date" && typeof dataEntry[key] === "number") {
          totalSum += dataEntry[key] as number;
        }
      }
      return totalSum;
    }, 0); // Initialize the sum to 0
  };

  return (
    <>
      <ReportsLayout activePage="Active Users Growth Chart">
        <ReportCard
          cardTitle="Active Users Growth Chart"
          cardLink="/reports/active-users-growth"
          growthPercentage={
            activeUserGrowthChartDataJson.growthPercentage || "0"
          }
          total={
            formatNumberWithCommas(findTotalSum(activeUserGrowthChartData)) || 0
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

        <div className="mt-4">
          <ReportTable
            dataPerPage={7}
            data={activeUserGrowthTableData.data}
            headings={[
              "S.N.",
              "Business Name",
              "Industry Type",
              "Subs. Status",
              "Plan",
              "Reg. Date",
              "Country",
            ]}
            dataKeys={[
              "_id",
              "businessName",
              "industryType",
              "subStatus",
              "plan",
              "regDate",
              "country",
            ]}
          />
        </div>
      </ReportsLayout>
    </>
  );
};

export default IndustryTypePage;
