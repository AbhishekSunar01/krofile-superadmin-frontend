import PageLayout from "../layout/PageLayout";
import {
  ActiveSubscriberChart,
  Chart,
  TotalCustomers,
} from "../components/dashboard/index";
import activeSubscribers from "../json/dummyData/activeSubscribers.json";
import userGrowth from "../json/dummyData/userGrowth.json";
import referal from "../json/dummyData/referalData.json";
import { CountryTable } from "../components/dashboard/CountryTable";

export default function Dashboard() {
  return (
    <PageLayout
      title="Dashboard"
      description="Easily manage business changes with comprehensive performance metrics and detailed tracking of all upgrades and downgrades."
    >
      <div className="flex gap-4 w-full mb-6">
        <TotalCustomers />
        <ActiveSubscriberChart
          pieData={activeSubscribers.pieData}
          titleData={activeSubscribers.titleData}
        />
      </div>
      <div className="flex gap-4">
        <Chart
          chartData={userGrowth}
          title="Active Users Growth Chart"
          tooltipData="Count"
        />
        <CountryTable tableData={activeSubscribers.tableData} />
        <Chart chartData={referal} title="B2B Referral" tooltipData="Refers" />
      </div>
    </PageLayout>
  );
}
