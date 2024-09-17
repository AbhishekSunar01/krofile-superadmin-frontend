import ReportCard from "../../components/reports/ReportCard";
import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import ReportStackedChart from "../../components/reports/StackedAreaChart";
import { ChartConfig } from "../../components/ui/chart";
import activeUserGrowthChartDataJson from "../../json/dummyData/activeUserGrowthChartData.json";
import retentionChartDataJson from "../../json/dummyData/retentionGrowthData.json";
import { getMonths } from "../../utils/getMonths";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

const RetentionGrowthPage = () => {
  const retentionChartData: IChartData[] = retentionChartDataJson.chartData;

  const retentionChartLabels: string[] = ["retentionrate", "retentiongrowth"];

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

  const retentionTableData = retentionChartData.map((data, index) => {
    const retentionrate = data.retentionrate || 0;
    const retentiongrowth = data.retentiongrowth || 0;
    const month = getMonths(new Date(data.date).getMonth());

    return {
      ...data,
      retentionrate,
      retentiongrowth,
      month: month,
      _id: index + 1,
    };
  });

  return (
    <>
      <ReportsLayout activePage="Retention Growth">
        <ReportCard
          cardTitle="Retention Growth"
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
        <div className="mt-4">
          <ReportTable
            dataPerPage={7}
            data={retentionTableData}
            headings={["Month", "Retention Rate (%)", "Retention Growth (%)"]}
            dataKeys={["month", "retentionrate", "retentiongrowth"]}
          />
        </div>
      </ReportsLayout>
    </>
  );
};

export default RetentionGrowthPage;
