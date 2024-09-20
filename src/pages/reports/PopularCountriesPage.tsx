import ReportCard from "../../components/reports/ReportCard";
import ReportLineChart from "../../components/reports/ReportLineChart";
import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import { ChartConfig } from "../../components/ui/chart";
import popularCountriesDataJson from "../../json/dummyData/popularCountriesChartData.json";
import formatNumberWithCommas from "../../utils/formatNumberWithComma";
import popularTableData from '../../json/dummyData/popularCountriesData.json';

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

const PopularCountriesPage = () => {
  const popularCountriesChartData: IChartData[] = popularCountriesDataJson.data;

  const popularCountriesLabels: string[] = ["USA", "UK", "Nepal"]; // Labels for Line Chart

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

  return (
    <>
      <ReportsLayout activePage="Business acc. to Popular Countries">
        <ReportCard
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

        <div className="mt-4">
          <ReportTable
            dataPerPage={7}
            data={popularTableData.data}
            headings={["Country", "Users"]}
            dataKeys={[
              "country",
              "users",
            ]}
            paginationType="withNumber"
          />
        </div>
      </ReportsLayout>
    </>
  );
};

export default PopularCountriesPage;
