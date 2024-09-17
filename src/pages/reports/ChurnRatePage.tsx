import ReportAreaChart from "../../components/reports/AreaChart";
import ReportCard from "../../components/reports/ReportCard";
import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import { ChartConfig } from "../../components/ui/chart";
import churnRateDataJson from "../../json/dummyData/churnRateData.json";
import { getMonths } from "../../utils/getMonths";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

const ChurnRatePage = () => {
  const churnRateData: IChartData[] = churnRateDataJson.chartData;

  const churnRateChartLabels: string[] = ["ChurnRate"];

  const churnRateChartConfig = {
    churnrate: {
      label: "ChurnRate",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const churnRateTableData = churnRateData.map((data, index) => {
    const churnRate = data.churnrate || 0;

    const month = getMonths(new Date(data.date).getMonth());
    const day = new Date(data.date).getDate();

    return {
      ...data,
      churnrate: churnRate,
      month: day + " " + month,
      _id: index + 1,
    };
  });

  return (
    <>
      <ReportsLayout activePage="Churn Rate">
        <ReportCard
          cardTitle="Churn Rate"
          growthPercentage={churnRateDataJson.growthPercentage || "0"}
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

        <div className="mt-4">
          <div className="mt-4">
            <ReportTable
              dataPerPage={7}
              data={churnRateTableData}
              headings={["Month", "Churn Rate (%)", "Churn Users"]}
              dataKeys={["month", "churnrate", "churnUsers"]}
            />
          </div>
        </div>
      </ReportsLayout>
    </>
  );
};

export default ChurnRatePage;
