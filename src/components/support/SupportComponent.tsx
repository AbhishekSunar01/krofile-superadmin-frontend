import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "../ui/tabs";
import Business from "./Business";
import NoData from "./NoData";
import Overview from "./Overview";
import Subscription from "./Subscription";
import SupportTicket from "./SupportTicket";

export default function SupportComponent() {
  const overviewHasData = false;
  const businessHasData = false;
  const supportHasData = false;
  const subscriptionHasData = false;

  return (
    <div className="w-full min-h-[80vh] bg-white p-6 gap-4 rounded-[12px]">
      <h1 className="text-xl font-semibold">Overall Notifications</h1>
      <CustomTabs defaultValue="overview">
        <CustomTabsList className="ml-11">
          <CustomTabsTrigger value="overview">Overview</CustomTabsTrigger>
          <CustomTabsTrigger value="business">Business</CustomTabsTrigger>
          <CustomTabsTrigger value="support">Support Ticket</CustomTabsTrigger>
          <CustomTabsTrigger value="subscription">
            Subscription Query
          </CustomTabsTrigger>
        </CustomTabsList>

        <CustomTabsContent value="overview">
          {overviewHasData ? <Overview /> : <NoData />}
        </CustomTabsContent>

        <CustomTabsContent value="business">
          {businessHasData ? <Business /> : <NoData />}
        </CustomTabsContent>

        <CustomTabsContent value="support">
          {supportHasData ? <SupportTicket /> : <NoData />}
        </CustomTabsContent>

        <CustomTabsContent value="subscription">
          {subscriptionHasData ? <Subscription /> : <NoData />}
        </CustomTabsContent>
      </CustomTabs>
    </div>
  );
}
