import DataTable from "../components/custom-ui/DataTable";
import PageLayout from "../layout/PageLayout";
import data from "../json/dummyData/activityLog.json";
import { ActivityLogColumns } from "../components/activity-log/ActivityColumn";
import NoData from "../components/custom-ui/NoData";

export default function ActivityLog() {
  const activityHasData = true;
  return (
    <PageLayout
      title="Activity Log"
      description="Supervise and audit all platform activities to ensure transparency and accountability. Record every action carefully to maintain system integrity and security."
    >
      {activityHasData ? (
        <>
          <h1 className=" text-[22px] font-medium bg-transparent mb-4">
            Activity List
          </h1>
          <DataTable
            columns={ActivityLogColumns}
            data={data}
            showDownload={true}
          />
        </>
      ) : (
        <NoData />
      )}
    </PageLayout>
  );
}
