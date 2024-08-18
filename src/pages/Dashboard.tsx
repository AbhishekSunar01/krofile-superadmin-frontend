import PageLayout from "../layout/PageLayout";
import activeSubscribers from "../json/dummyData/activeSubscribers.json";
import {
  ActiveSubscriberChart,
  TotalCustomers,
} from "../components/dashboard/index";

export default function Dashboard() {
  return (
    <PageLayout
      title="Dashboard"
      description="Easily manage business changes with comprehensive performance metrics and detailed tracking of all upgrades and downgrades."
    >
      <div className="flex w-full justify-center gap-4">
        <div className="w-3/4">
          <TotalCustomers />
        </div>
        <div>
          <ActiveSubscriberChart
            pieData={activeSubscribers.pieData}
            titleData={activeSubscribers.titleData}
          />
        </div>
      </div>
    </PageLayout>
  );
}
