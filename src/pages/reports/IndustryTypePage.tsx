import GrowthIndicator from "../../assets/svg/growthindicator.svg";
import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import IndustryDataJson from "../../json/dummyData/industryData.json";

const IndustryTypePage = () => {
  const IndustryTableData: Record<string, any>[] = IndustryDataJson.data;

  const findTotal = (data: Record<string, any>[]): number => {
    const total = data.reduce((acc: number, curVal: Record<string, any>) => {
      const count = curVal.count || 0; // Handle cases where count might be undefined
      return acc + count;
    }, 0); // Initialize the accumulator to 0
    return total;
  };
  return (
    <>
      <ReportsLayout activePage="Active Users by Industry Type">
        <div className="flex select-none justify-start items-center gap-[2px]">
          <span className="text-[28px] text-[#14181F] font-inter font-[600]">
            {findTotal(IndustryTableData)}
          </span>
          <img
            src={GrowthIndicator}
            alt="Growth Indicator"
            className="inline-block"
          />
          <span className="text-[#14181F] text-[12px] font-[500] justify-center items-center inline-block">
            {IndustryDataJson.growthPercentage !== undefined
              ? IndustryDataJson.growthPercentage
              : 0}
            %&nbsp;
          </span>
          <span className="text-[#1E7BC8] text-[12px] font-[400]">
            vs previous period&nbsp;
          </span>
        </div>
        <div className="mt-4">
          <ReportTable
            dataPerPage={7}
            data={IndustryTableData}
            headings={["Industry Type", "Count", "Ratio"]}
            dataKeys={["industryType", "count", "ratio"]}
            paginationType="withNumber"
          />
        </div>
      </ReportsLayout>
    </>
  );
};

export default IndustryTypePage;
