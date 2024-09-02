import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
      <Tabs defaultValue="overview">
        <TabsList className="ml-11">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="support">Support Ticket</TabsTrigger>
          <TabsTrigger value="subscription">Subscription Query</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {overviewHasData ? <Overview /> : <NoData />}
        </TabsContent>

        <TabsContent value="business">
          {businessHasData ? <Business /> : <NoData />}
        </TabsContent>

        <TabsContent value="support">
          {supportHasData ? <SupportTicket /> : <NoData />}
        </TabsContent>

        <TabsContent value="subscription">
          {subscriptionHasData ? <Subscription /> : <NoData />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
