import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnnuallyPlan from "./AnnuallyPlan";
import MonthlyPlan from "./MonthlyPlan";

export default function SubscriptionPlan() {
  return (
    <Tabs defaultValue="monthly" className="w-full">
      <TabsList className="grid grid-cols-2 border w-[400px] h-full p-2">
        <TabsTrigger className="py-2 px-2" value="monthly">
          Monthly
        </TabsTrigger>
        <TabsTrigger className="py-2 px-2" value="annually">
          Annually
        </TabsTrigger>
      </TabsList>
      <TabsContent value="monthly">
        <MonthlyPlan />
      </TabsContent>
      <TabsContent value="annually">
        <AnnuallyPlan />
      </TabsContent>
    </Tabs>
  );
}
