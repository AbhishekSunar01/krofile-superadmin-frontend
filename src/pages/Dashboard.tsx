import PageLayout from "../layout/PageLayout";
import activeSubscribers from "../json/dummyData/activeSubscribers.json";
import {
  ActiveSubscriberChart,
  TotalCustomers,
  UsersGrowth,
} from "../components/dashboard/index";
import userGrowth from "../json/dummyData/userGrowth.json";

export default function Dashboard() {
  return (
    <PageLayout
      title="Dashboard"
      description="Easily manage business changes with comprehensive performance metrics and detailed tracking of all upgrades and downgrades."
    >
      <div className="flex w-full items-start justify-between mb-5">
        <div>
          <TotalCustomers />
        </div>
        <div>
          <ActiveSubscriberChart
            pieData={activeSubscribers.pieData}
            titleData={activeSubscribers.titleData}
          />
        </div>
      </div>{" "}
      <div className="">
        <UsersGrowth
          chartData={userGrowth.chartData}
          titleData={userGrowth.titleData}
        />
      </div>
    </PageLayout>
  );
}
