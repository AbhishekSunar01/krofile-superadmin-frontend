import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Business from "./Business";
import Overview from "./Overview";
import Subscription from "./Subscription";
import SupportTicket from "./SupportTicket";

export default function SupportComponent() {
  return (
    <div className=" w-full min-h-[90vh] bg-white p-6 gap-4 rounded-[12px]">
      <h1 className=" text-xl font-semibold">Overall Notifications</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="support">Support Ticket</TabsTrigger>
          <TabsTrigger value="subscription">Subscription Query</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="business">
          <Business />
        </TabsContent>
        <TabsContent value="support">
          <SupportTicket />
        </TabsContent>
        <TabsContent value="subscription">
          <Subscription />
        </TabsContent>
      </Tabs>
    </div>
  );
}
