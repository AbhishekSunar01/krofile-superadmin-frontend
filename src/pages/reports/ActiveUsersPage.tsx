import ReportsLayout from "../../components/reports/ReportsLayout";
import ReportTable from "../../components/reports/ReportTable";
import activeUserGrowthTableData from "../../json/dummyData/activeUserGrowthTableData.json";

const ActiveUsersPage = () => {
  return (
    <>
      <ReportsLayout activePage="Active Users">
        <div className="mt-4">
          <ReportTable
            dataPerPage={7}
            data={activeUserGrowthTableData.data}
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
