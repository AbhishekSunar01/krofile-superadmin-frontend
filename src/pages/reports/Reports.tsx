import { ChartConfig } from "../../components/ui/chart";
import PageLayout from "../../layout/PageLayout";

import {
  default as ReportAreaChart,
  default as ReportChart,
} from "../../components/reports/AreaChart";
import ReportBarChart from "../../components/reports/ReportBarChart";
import ReportCard from "../../components/reports/ReportCard";
import ReportLineChart from "../../components/reports/ReportLineChart";
import ReportTable from "../../components/reports/ReportTable";
import ReportStackedChart from "../../components/reports/StackedAreaChart";
import ActiveSubscribersDataJson from "../../json/dummyData/activeSubscribersData.json";
import activeUserGrowthChartDataJson from "../../json/dummyData/activeUserGrowthChartData.json";
import b2breferralDataJson from "../../json/dummyData/b2breferrals.json";
import churnRateDataJson from "../../json/dummyData/churnRateData.json";
import IndustryDataJson from "../../json/dummyData/industryData.json";
import popularCountriesDataJson from "../../json/dummyData/popularCountriesChartData.json";
import retentionChartDataJson from "../../json/dummyData/retentionGrowthData.json";
import systemHealthDataJson from "../../json/dummyData/systemHealthData.json";
import formatNumberWithCommas from "../../utils/formatNumberWithComma";
import { YAxisNumberTickFormatter } from "../../utils/YAxisNumberTickFormatter";
import { YAxisPercentageTickFormatter } from "../../utils/YAxisPercentageTickFormatter";

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
  const systemHealthChartData: IChartData[] = systemHealthDataJson.chartData;
  const b2bReferralChartData: IChartData[] = b2breferralDataJson.data
    .map((data) => {
      const chartData = {
        date: data.dateOfReferral,
        count: data.numberOfReferrals,
      };
      return chartData;
    })
    .slice(0, 8);
  const popularCountriesChartData: IChartData[] = popularCountriesDataJson.data;
  const IndustryTableData: Record<string, any>[] = IndustryDataJson.data;

  const activeUserChartLabels: string[] = ["Count"];
  const retentionChartLabels: string[] = ["retentionrate", "retentiongrowth"];
  const churnRateChartLabels: string[] = ["ChurnRate"];
  const b2bReferralsLabels: string[] = ["Count"];
  const popularCountriesLabels: string[] = ["USA", "UK", "Nepal"]; // Labels for Line Chart

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

  const systemHealthChartConfig = {
    online: {
      label: "Online",
      color: "#00A81C",
    },
    offline: {
      label: "Offline",
      color: "#DF0C3D",
    },
  } satisfies ChartConfig;

  const b2bReferralChartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  const popularContriesChartConfig = {
    USA: {
      label: "USA",
      color: "#00A81C",
    },
    UK: {
      label: "UK",
      color: "#DF0C3D",
    },
    Nepal: {
      label: "Nepal",
      color: "#DB6E00",
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

  const findTotal = (data: Record<string, any>[]): number => {
    const total = data.reduce((acc: number, curVal: Record<string, any>) => {
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
          cardLink="/reports/active-users-growth"
          growthPercentage={
            activeUserGrowthChartDataJson.growthPercentage || "0"
          }
          total={
            formatNumberWithCommas(findTotalSum(activeUserGrowthChartData)) || 0
          }
          childrenComponent={
            <ReportChart
              chartConfig={activeUserGrowthChartConfig}
              chartData={activeUserGrowthChartData}
              XAxisDataKey={"date"}
              YAxisDataKey={"count"}
              areaType="natural"
              chartLabels={activeUserChartLabels}
              tickFormatter={YAxisNumberTickFormatter}
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
          cardLink="/reports/active-users"
          growthPercentage={ActiveSubscribersDataJson.growthPercentage || "0"}
          total={formatNumberWithCommas(ActiveSubscribersData.length) || 0}
          childrenComponent={
            <ReportTable
              dataPerPage={5}
              data={ActiveSubscribersData}
              headings={["Business Name", "Reg. Date", "Subs. Plan"]}
              dataKeys={["businessName", "date", "plan"]}
              paginationType="withoutNumber"
            />
          }
        />

        <ReportCard
          cardTitle="Retention Growth"
          cardLink="/reports/retention-growth"
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
          cardLink="/reports/churn-rate"
          growthPercentage={churnRateDataJson.growthPercentage || "0"}
          childrenComponent={
            <ReportAreaChart
              YAxisDataKey="churnrate"
              chartConfig={churnRateChartConfig}
              chartData={churnRateData}
              XAxisDataKey={"date"}
              areaType="linear"
              chartLabels={churnRateChartLabels}
              tickFormatter={YAxisPercentageTickFormatter}
              gradientColors={{
                startColor: "#EE222266",
                endColor: "#FF858500",
              }}
              strokeColor="#EE2222"
            />
          }
        />
        <ReportCard
          cardTitle="System Health"
          cardLink="/reports/system-health"
          growthPercentage={systemHealthDataJson.growthPercentage || "0"}
          // total={findTotal(activeUserGrowthChartData) || 0}
          childrenComponent={
            <ReportBarChart
              chartConfig={systemHealthChartConfig}
              chartData={systemHealthChartData}
              YAxisDataKey={"online"}
              chartLabels={["online", "offline"]}
              tickFormatter={YAxisPercentageTickFormatter}
            />
          }
        />
        <ReportCard
          cardTitle="B2B Referral"
          cardLink="/reports/b2b-referral"
          growthPercentage={b2breferralDataJson.growthPercentage || "0"}
          total={
            formatNumberWithCommas(findTotalSum(b2bReferralChartData)) || 0
          }
          childrenComponent={
            <ReportAreaChart
              chartConfig={b2bReferralChartConfig}
              chartData={b2bReferralChartData}
              XAxisDataKey={"date"}
              YAxisDataKey={"count"}
              areaType="natural"
              chartLabels={b2bReferralsLabels}
              tickFormatter={YAxisNumberTickFormatter}
              gradientColors={{
                startColor: "#22D1EE66",
                endColor: "#85EEFF4D",
              }}
              strokeColor="#22D1EE"
            />
          }
        />
        <ReportCard
          cardTitle="Business acc. to Popular Countries"
          cardLink="/reports/popular-countries"
          growthPercentage={popularCountriesDataJson.growthPercentage || "0"} // Correct Data
          total={
            formatNumberWithCommas(findTotalSum(popularCountriesChartData)) || 0
          } // Correct Total Calculation
          childrenComponent={
            <ReportLineChart
              chartConfig={popularContriesChartConfig}
              chartData={popularCountriesChartData} // Correct Data for Popular Countries
              XAxisDataKey={"date"}
              chartLabels={popularCountriesLabels} // Correct Labels for Countries
              lineType="linear"
            />
          }
        />

        <ReportCard
          cardTitle="Active Users by Industry Type"
          cardLink="/reports/industry-type"
          growthPercentage={IndustryDataJson.growthPercentage || "0"}
          total={formatNumberWithCommas(findTotal(IndustryTableData)) || 0}
          childrenComponent={
            <ReportTable
              dataPerPage={5}
              data={IndustryTableData}
              headings={["Industry Type", "Count", "Ratio"]}
              dataKeys={["industryType", "count", "ratio"]}
              paginationType="withoutNumber"
            />
          }
        />
      </div>
    </PageLayout>
  );
}
