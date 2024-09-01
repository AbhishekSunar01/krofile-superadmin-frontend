import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import PageLayout from "../layout/PageLayout";
import {
  NavigationTabs,
  ContentManagement,
  SubscriptionPlan,
  Configure,
  FinalPreview,
} from "../components/subscription-manager/index";

const TabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case "Content Management":
      return <ContentManagement />;
    case "Subscription Plan":
      return <SubscriptionPlan />;
    case "Configure":
      return <Configure />;
    case "Final Preview":
      return <FinalPreview />;
    default:
      return null;
  }
};

export default function SubscriptionManager() {
  const [activeTab, setActiveTab] = useState("Content Management");

  return (
    <PageLayout
      title="Subscription Manager"
      description="Easily manage and update subscription content, create, modify, and delete plans and features, and offer discounts and referral bonuses to users."
    >
      <Card className="w-full p-4">
        <div className="border-b flex justify-between items-end pt-2">
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="pb-4">
            <Button variant={"disabled"} size="lg" className="rounded-xl">
              Save
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <TabContent activeTab={activeTab} />
        </div>
      </Card>
    </PageLayout>
  );
}
