import { useTabStateStore } from "../../store/subscriptionManagerStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ReferralPeriodManagement from "./content-management/ReferralPeriodManagement";
import TrailPeriodManagement from "./content-management/TrialPeriodManagement";

type setSaveEnabled = (value: boolean) => void;

export default function ContentManagement({
  setSaveEnabled,
}: {
  setSaveEnabled: setSaveEnabled;
}) {
  const { activeTab, setActiveTab } = useTabStateStore();
  console.log("activeTab", activeTab);

  return (
    <Tabs defaultValue="trial" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-2 border w-fit h-full p-2">
        <TabsTrigger className="py-2 px-2" value="trial">
          Trial Period Management
        </TabsTrigger>
        <TabsTrigger className="py-2 px-2" value="referral">
          Referral Period Management
        </TabsTrigger>
      </TabsList>
      <TabsContent value="trial">
        <TrailPeriodManagement setSaveEnabled={setSaveEnabled} />
      </TabsContent>
      <TabsContent value="referral">
        <ReferralPeriodManagement setSaveEnabled={setSaveEnabled} />
      </TabsContent>
    </Tabs>
  );
}
