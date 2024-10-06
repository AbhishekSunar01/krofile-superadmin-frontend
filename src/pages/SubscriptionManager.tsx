import { useState } from "react";
import { Button } from "../components/ui/button";
import PageLayout from "../layout/PageLayout";
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "../components/ui/tabs";
import {
  ContentManagement,
  SubscriptionPlan,
  Configure,
  FinalPreview,
} from "../components/subscription-manager/index";
import { useTabStateStore } from "../store/subscriptionManagerStore";
import useSaveSubscriptionData from "../hooks/useSaveSubscriptionData";

export default function SubscriptionManager() {
  const { setActiveTab } = useTabStateStore();
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const saveData = useSaveSubscriptionData();

  const handleSave = () => {
    saveData();
  };

  return (
    <PageLayout
      title="Subscription Manager"
      description="Easily manage and update subscription content, create, modify, and delete plans and features, and offer discounts and referral bonuses to users."
    >
      <div className="w-full bg-white p-6 gap-4 rounded-[12px] relative">
        <div className="w-full">
          <Button
            variant={isSaveEnabled ? "default" : "disabled"}
            size="lg"
            className="absolute rounded-xl right-8 top-4"
            onClick={handleSave}
            disabled={!isSaveEnabled}
          >
            Save
          </Button>
        </div>
        <CustomTabs
          defaultValue="trial"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <CustomTabsList className="ml-11">
            <CustomTabsTrigger value="trial">
              Content Management
            </CustomTabsTrigger>
            <CustomTabsTrigger value="monthly">
              Subscription Plan
            </CustomTabsTrigger>
            <CustomTabsTrigger value="Configure">Configure</CustomTabsTrigger>
            <CustomTabsTrigger value="Final Preview">
              Final Preview
            </CustomTabsTrigger>
          </CustomTabsList>
          <CustomTabsContent value="trial">
            <ContentManagement setSaveEnabled={setIsSaveEnabled} />
          </CustomTabsContent>
          <CustomTabsContent value="monthly">
            <SubscriptionPlan />
          </CustomTabsContent>
          <CustomTabsContent value="Configure">
            <Configure />
          </CustomTabsContent>
          <CustomTabsContent value="Final Preview">
            <FinalPreview />
          </CustomTabsContent>
        </CustomTabs>
      </div>
    </PageLayout>
  );
}
