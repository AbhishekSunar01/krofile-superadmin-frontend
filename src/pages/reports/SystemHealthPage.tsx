import ReportBarChart from "../../components/reports/ReportBarChart";
import ReportCard from "../../components/reports/ReportCard";
import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import { ChartConfig } from "../../components/ui/chart";
import systemHealthDataJson from "../../json/dummyData/systemHealthData.json";
import { getMonths } from "../../utils/getMonths";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

const SystemHealthPage = () => {
  const systemHealthChartData: IChartData[] = systemHealthDataJson.chartData;

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

  const systemHealthTableData = systemHealthChartData.map((data, index) => {
    const month = getMonths(new Date(data.date).getMonth());
    const day = new Date(data.date).getDate();

    return {
      ...data,
      month: day + " " + month,
      _id: index + 1,
    };
  });

  return (
    <>
      <ReportsLayout activePage="System Health">
        <ReportCard
          growthPercentage={systemHealthDataJson.growthPercentage || "0"}
          childrenComponent={
            <ReportBarChart
              chartConfig={systemHealthChartConfig}
              chartData={systemHealthChartData}
              YAxisDataKey={"online"}
              chartLabels={["online", "offline"]}
              tickFormatter={(value) => value + "%"}
            />
          }
        />

        <div className="mt-4">
          <ReportTable
            dataPerPage={7}
            data={systemHealthTableData}
            headings={["Month", "Online (%)", "Offline (%)"]}
            dataKeys={["month", "online", "offline"]}
            paginationType="withNumber"
          />
        </div>
      </ReportsLayout>
    </>
  );
};

export default SystemHealthPage;
