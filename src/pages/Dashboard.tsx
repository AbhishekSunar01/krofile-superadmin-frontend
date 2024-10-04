import { useLayoutEffect, useState } from "react";
import {
  ActiveSubscriberChart,
  Chart,
  CountryTable,
  DashboardTable,
  TotalCustomers,
} from "../components/dashboard/index";
import activeSubscribers from "../json/dummyData/activeSubscribers.json";
import country from "../json/dummyData/countryTable.json";
import industryData from "../json/dummyData/industryType.json";
import referral from "../json/dummyData/referralData.json";
import subscribersData from "../json/dummyData/subscribersData.json";
import userGrowth from "../json/dummyData/userGrowth.json";
import PageLayout from "../layout/PageLayout";
import { useLoggedInUser } from "../services/queries/authQuery";
import { useUserStore } from "../store/userStore";

export default function Dashboard() {
  const [dashboardHasData, setDashboardHasData] = useState(false);

  const handleButtonClick = () => {
    setDashboardHasData(true);
  };

  const { data } = useLoggedInUser();

  const { setLoggedInUserData } = useUserStore();

  useLayoutEffect(() => {
    if (data !== undefined) {
      setLoggedInUserData(data.data);
    }
  }, [data]);

  return (
    <PageLayout
      title="Dashboard"
      description="Easily manage business changes with comprehensive performance metrics and detailed tracking of all upgrades and downgrades."
    >
      <div className="relative">
        {!dashboardHasData && (
          <div className="flex absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-10 items-center justify-center">
            <div className="flex flex-col text-[#151515] gap-y-4 -mt-80">
              <span className="text-xl font-semibold ">
                You currently don’t have any data
              </span>
              <span className=" text-base font-normal">
                Empty fields will be filled with your data soon
              </span>
              <button
                onClick={handleButtonClick}
                className="w-fit mx-auto px-6 py-2 text-white font-semibold rounded-[24px] bg-gradient-to-b from-[#00A81C] to-[#00DA24] shadow-[0_4px_12px_rgba(0,218,36,0.20)]"
              >
                Let's Start
              </button>
            </div>
          </div>
        )}
        <div className={`${!dashboardHasData ? " blur-0" : ""}`}>
          <div className="grid grid-cols-8 gap-6 w-full mb-6">
            <TotalCustomers className="col-span-5" />
            <ActiveSubscriberChart
              pieData={activeSubscribers.pieData}
              titleData={activeSubscribers.titleData}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-12 gap-6 mb-6">
            <Chart
              chartData={userGrowth}
              title="Active Users Growth Chart"
              tooltipData="Count"
              className="col-span-4"
            />
            <CountryTable tableData={country} className="col-span-3" />
            <Chart
              chartData={referral}
              title="B2B Referral"
              tooltipData="Refers"
              className="col-span-5"
            />
          </div>
          <div className="flex w-full gap-6 ">
            <DashboardTable
              data={industryData}
              title="Active Users by Industry Type"
              type={"industry"}
            />
            <DashboardTable
              data={subscribersData}
              title="Active Subscribers"
              type={""}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
