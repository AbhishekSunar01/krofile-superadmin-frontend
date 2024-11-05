import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import activeUserGrowthTableData from "../../json/dummyData/activeUserGrowthTableData.json";
import { formatDate } from "../../utils/formateDate";

const ActiveUsersPage = () => {
  const tableData = activeUserGrowthTableData.data.map((data) => {
    const tableRow = {
      businessName: data.businessName,
      industryType: data.industryType,
      subStatus: data.subStatus,
      plan: data.plan,
      regDate: formatDate(data.regDate),
      country: data.country,
    };
    return tableRow;
  }
)


  return (
    <>
      <ReportsLayout activePage="Active Users">
        <div className="mt-4">
          <ReportTable
            cellHeight="h-[80px]"
            dataPerPage={7}
            data={tableData}
            headings={[
              "Business Name",
              "Industry Type",
              "Subs. Status",
              "Plan",
              "Reg. Date",
              "Country",
            ]}
            dataKeys={[
              "businessName",
              "industryType",
              "subStatus",
              "plan",
              "regDate",
              "country",
            ]}
            paginationType="withNumber"
          />
        </div>
      </ReportsLayout>
    </>
  );
};

export default ActiveUsersPage;
