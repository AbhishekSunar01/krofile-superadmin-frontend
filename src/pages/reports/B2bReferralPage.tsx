import ReportAreaChart from "../../components/reports/AreaChart";
import ReportCard from "../../components/reports/ReportCard";
import ReportsLayout from "../../components/reports/ReportsLayout";
import { ChartConfig } from "../../components/ui/chart";
import b2breferralDataJson from "../../json/dummyData/b2breferrals.json";
import formatNumberWithCommas from "../../utils/formatNumberWithComma";

interface IChartData {
  date: string;
  [key: string]: any; // This allows for any number of additional properties with any type
}

const B2bReferralPage = () => {
  const b2bReferralChartData: IChartData[] = b2breferralDataJson.data.map(
    (data) => {
      const chartData = {
        date: data.dateOfReferral,
        count: data.numberOfReferrals,
      };
      return chartData;
    }
  );

  const b2bReferralsLabels: string[] = ["Count"];

  const b2bReferralChartConfig = {
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
      <ReportsLayout activePage="B2B Referral">
        <ReportCard
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
              tickFormatter={(value) => value / 1000 + "k"}
              gradientColors={{
                startColor: "#22D1EE66",
                endColor: "#85EEFF4D",
              }}
              strokeColor="#22D1EE"
            />
          }
        />

        {/* <div className="mt-4">
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
        </div> */}
      </ReportsLayout>
    </>
  );
};

export default B2bReferralPage;
