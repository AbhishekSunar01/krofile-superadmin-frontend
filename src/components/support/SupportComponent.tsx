import { useState } from "react";
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "../ui/tabs";
import Business from "./Business";
import NoData from "../custom-ui/NoData";
import Overview from "./Overview";
import Subscription from "./Subscription";
import SupportTicket from "./SupportTicket";

export default function SupportComponent() {
  const [activeTab, setActiveTab] = useState("overview");

  const overviewHasData = true;
  const businessHasData = true;
  const supportHasData = true;
  const subscriptionHasData = true;

  const getHeading = () => {
    switch (activeTab) {
      case "overview":
        return "Overall Notifications";
      case "business":
        return "Business Notifications";
      case "support":
        return "Support Ticket";
      case "subscription":
        return "Subscription Inquiries";
      default:
        return "Overall Notifications";
    }
  };

  return (
    <div className="w-full min-h-[80vh] bg-white p-6 gap-4 rounded-[12px]">
      <h1 className="text-xl font-semibold">{getHeading()}</h1>
      <CustomTabs defaultValue="overview" onValueChange={setActiveTab}>
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
