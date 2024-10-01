import MonthlyPlan from "./MonthlyPlan";
import AnnuallyPlan from "./AnnuallyPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useSubscriptionPlans } from "../../services/queries/useSubscriptionQuery";
import {
  useSubscriptionPlanStore,
  useTabStateStore,
} from "../../store/subscriptionManagerStore";
import { useEffect } from "react";

// export default function SubscriptionPlan() {
//   // Use the useQuery hook to fetch subscription plans
//   const { data: subcriptionPlans, isLoading, error } = useSubscriptionPlans();

//   console.log("taneko value", subcriptionPlans);

//   // Get the setPlans method from the store
//   const setPlans = useSubscriptionPlanStore((state) => state.setPlans);
//   const subscriptionPlanState = useSubscriptionPlanStore((state) => state);

//   // Use useEffect to set the plans in the store when subcriptionPlans changes
//   useEffect(() => {
//     if (subcriptionPlans) {
//       setPlans(subcriptionPlans.plans);
//     }
//   }, [subcriptionPlans, setPlans]);

//   // Use useEffect to log the state whenever it changes
//   useEffect(() => {
//     console.log("Current state:", subscriptionPlanState);
//   }, [subscriptionPlanState]);
//   // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching plans</div>;

//   // Add a check to ensure `plans` is defined before passing it to the child components
//   if (!subcriptionPlans) return <div>No plans available</div>;

//   return (
//     <Tabs defaultValue="monthly" className="w-full">
//       <TabsList className="grid grid-cols-2 border w-[400px] h-full p-2">
//         <TabsTrigger className="py-2 px-2" value="monthly">
//           Monthly
//         </TabsTrigger>
//         <TabsTrigger className="py-2 px-2" value="annually">
//           Annually
//         </TabsTrigger>
//       </TabsList>
//       <TabsContent value="monthly">
//         <MonthlyPlan plans={plans} />
//       </TabsContent>
//       <TabsContent value="annually">
//         <AnnuallyPlan plans={plans} />
//       </TabsContent>
//     </Tabs>
//   );
// }
export default function SubscriptionPlan() {
  // Use the useQuery hook to fetch subscription plans
  const { data: subcriptionPlans, isLoading, error } = useSubscriptionPlans();
  const { activeTab, setActiveTab } = useTabStateStore();
  console.log("activeTab", activeTab);

  // Get the setPlans method and the plans state from the store
  const setPlans = useSubscriptionPlanStore((state) => state.setPlans);
  const plans = useSubscriptionPlanStore((state) => state.plans);

  // Use useEffect to set the plans in the store when subcriptionPlans changes
  useEffect(() => {
    if (subcriptionPlans) {
      setPlans(subcriptionPlans.plans);
    }
  }, [subcriptionPlans, setPlans]);

  // Use useEffect to log the state whenever it changes
  useEffect(() => {
    console.log("Current plans state:", plans);
  }, [plans]);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching plans</div>;

  // Add a check to ensure `plans` is defined before passing it to the child components
  if (!plans || plans.length === 0) return <div>No plans available</div>;

  return (
    <Tabs
      defaultValue="monthly"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <TabsList className="grid grid-cols-2 border w-[400px] h-full p-2">
        <TabsTrigger className="py-2 px-2" value="monthly">
          Monthly
        </TabsTrigger>
        <TabsTrigger className="py-2 px-2" value="annually">
          Annually
        </TabsTrigger>
      </TabsList>
      <TabsContent value="monthly">
        <MonthlyPlan plans={plans} />
      </TabsContent>
      <TabsContent value="annually">
        <AnnuallyPlan plans={plans} />
      </TabsContent>
    </Tabs>
  );
}
