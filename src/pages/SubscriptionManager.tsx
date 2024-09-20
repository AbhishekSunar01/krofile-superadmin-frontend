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

export default function SubscriptionManager() {
  const [, setActiveTab] = useState("Content Management");

  return (
    <PageLayout
      title="Subscription Manager"
      description="Easily manage and update subscription content, create, modify, and delete plans and features, and offer discounts and referral bonuses to users."
    >
      <div className="w-full bg-white p-6 gap-4 rounded-[12px] relative">
        <div className="w-full">
          <Button
            variant={"disabled"}
            size="lg"
            className="absolute rounded-xl right-8 top-4"
          >
            Save
          </Button>
        </div>
        <CustomTabs
          defaultValue="Content Management"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <CustomTabsList className="ml-11">
            <CustomTabsTrigger value="Content Management">
              Content Management
            </CustomTabsTrigger>
            <CustomTabsTrigger value="Subscription Plan">
              Subscription Plan
            </CustomTabsTrigger>
            <CustomTabsTrigger value="Configure">Configure</CustomTabsTrigger>
            <CustomTabsTrigger value="Final Preview">
              Final Preview
            </CustomTabsTrigger>
          </CustomTabsList>
          <CustomTabsContent value="Content Management">
            <ContentManagement />
          </CustomTabsContent>
          <CustomTabsContent value="Subscription Plan">
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
