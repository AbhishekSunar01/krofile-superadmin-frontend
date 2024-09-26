import MonthlyPlan from "./MonthlyPlan";
import AnnuallyPlan from "./AnnuallyPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useSubscriptionPlans } from "../../services/queries/useSubscriptionQuery";

export default function SubscriptionPlan() {
  // Use the useQuery hook to fetch subscription plans
  const { data: plans, isLoading, error } = useSubscriptionPlans();

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching plans</div>;

  // Add a check to ensure `plans` is defined before passing it to the child components
  if (!plans) return <div>No plans available</div>;

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
        {/* Ensure that plans is passed only when defined */}
        <MonthlyPlan plans={plans} />
      </TabsContent>
      <TabsContent value="annually">
        <AnnuallyPlan plans={plans} />
      </TabsContent>
    </Tabs>
  );
}
