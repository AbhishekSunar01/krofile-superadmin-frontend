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
import {
  usePostReferralContent,
  usePostTrialContent,
} from "../services/mutations/subscriptionMutation";
import {
  useReferralPeriodManagementStore,
  useTrialPeriodManagementStore,
} from "../store/subscriptionManagerStore";

export default function SubscriptionManager() {
  const [, setActiveTab] = useState("Content Management");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Use the mutation hook for submitting trial content
  const postTrialMutation = usePostTrialContent();
  const postReferralMutation = usePostReferralContent();

  // Get trial data from Zustand store
  const trialPeriodData = useTrialPeriodManagementStore((state) => ({
    days: state.days,
    title: state.title,
    body: state.body,
    tagLine: state.tagLine,
  }));

  // Get referral data from Zustand store
  const referralPeriodData = useReferralPeriodManagementStore((state) => ({
    getReferralMonth: state.getReferralMonth,
    giveReferralMonth: state.giveReferralMonth,
    title: state.title,
    body: state.body,
    tagLine: state.tagLine,
  }));

  const handleSave = () => {
    postTrialMutation.mutate(trialPeriodData);
    postReferralMutation.mutate(referralPeriodData);
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
            <ContentManagement setSaveEnabled={setIsSaveEnabled} />
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
