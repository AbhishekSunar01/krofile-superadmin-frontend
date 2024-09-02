import PageLayout from "../layout/PageLayout";
import { TotalCustomers } from "../components/dashboard/index";

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
        {/* <div>
          <ActiveSubscriberChart
            pieData={activeSubscribers.pieData}
            titleData={activeSubscribers.titleData}
          />
        </div> */}
      </div>{" "}
      {/* <div className="">
        <UsersGrowth
          chartData={userGrowth.chartData}
          titleData={userGrowth.titleData}
        />
      </div> */}
    </PageLayout>
  );
}
