import { DataTable, Columns } from "../components/user-management";
import PageLayout from "../layout/PageLayout";
import data from "../json/dummyData/DataTable.json";

export default function UserManagement() {
  return (
    <PageLayout
      title="User Management"
      description="Keep a close eye on every aspect of your businesses, with the ability to track details and take decisive actions."
    >
      <DataTable
        columns={Columns}
        data={data}
        title="Overall User List"
        detailViewType="sheet"
        showDownload={true}
        fileName="User-List"
      />
    </PageLayout>
  );
}
