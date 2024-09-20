import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ReferralPeriodManagement from "./content-management/ReferralPeriodManagement";
import TrailPeriodManagement from "./content-management/TrialPeriodManagement";

export default function ContentManagement() {
  return (
    <Tabs defaultValue="trial" className="w-full">
      <TabsList className="grid grid-cols-2 border w-fit h-full p-2">
        <TabsTrigger className="py-2 px-2" value="trial">
          Trial Period Management
        </TabsTrigger>
        <TabsTrigger className="py-2 px-2" value="referral">
          Referral Period Management
        </TabsTrigger>
      </TabsList>
      <TabsContent value="trial">
        <TrailPeriodManagement />
      </TabsContent>
      <TabsContent value="referral">
        <ReferralPeriodManagement />
      </TabsContent>
    </Tabs>
  );
}
