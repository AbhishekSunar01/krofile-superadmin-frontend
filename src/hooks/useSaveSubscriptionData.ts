import {
  usePostMonethlySubscriptionPlan,
  usePostReferralContent,
  usePostTrialContent,
} from "../services/mutations/subscriptionMutation";
import {
  useSubscriptionPlanStore,
  useTabStateStore,
  useTrialPeriodManagementStore,
  useReferralPeriodManagementStore,
} from "../store/subscriptionManagerStore";
import { toast } from "sonner";

const useSaveSubscriptionData = () => {
  const postTrialContent = usePostTrialContent();
  const postReferralContent = usePostReferralContent();
  const postMonthlySubscriptionPlan = usePostMonethlySubscriptionPlan();
  const { activeTab } = useTabStateStore();

  const plans = useSubscriptionPlanStore((state) => state.plans);
  const globalDiscount = useSubscriptionPlanStore(
    (state) => state.globalDiscount
  );

  const trialPeriodData = useTrialPeriodManagementStore((state) => ({
    period: state.period,
    periodType: state.periodType,
    title: state.title,
    body: state.body,
    tagline: state.tagline,
  }));

  const referralPeriodData = useReferralPeriodManagementStore((state) => ({
    getReferralMonth: state.getReferralMonth,
    giveReferralMonth: state.giveReferralMonth,
    title: state.title,
    body: state.body,
    tagline: state.tagline,
  }));

  const callTrialData = () => {
    postTrialContent.mutate(trialPeriodData, {
      onSuccess: () => {
        toast.success("Trial data saved");
      },
      onError: () => {
        toast.error("Error saving trial data");
      },
    });

    // console.log(JSON.stringify(trialPeriodData, null, 2));
  };

  const callReferralData = () => {
    postReferralContent.mutate(referralPeriodData, {
      onSuccess: () => {
        toast.success("Referral data saved");
      },
      onError: () => {
        toast.error("Error saving referral data");
      },
    });

    // console.log(JSON.stringify(referralPeriodData, null, 2));
  };

  // const callMonthlyData = () => {
  //   const updates = plans.map((plan) => ({
  //     planId: plan._id,
  //     initialPrice: Number(plan.monthlyPrice[0]?.initialPrice) || 0,
  //     discount: Number(plan.monthlyPrice[0]?.discount) || 0,
  //     contactUs: plan.contactUs,
  //     isActive: plan.isActive,
  //   }));

  //   const stateData = {
  //     globalDiscount: 0,
  //     updates,
  //   };

  //   postMonthlySubscriptionPlan.mutate(stateData, {
  //     onSuccess: () => {
  //       toast.success("Monthly data saved");
  //     },
  //     onError: () => {
  //       toast.error("Error saving monthly data");
  //     },
  //   });

  //   console.log(JSON.stringify(stateData, null, 2));
  // };

  const callMonthlyData = () => {
    const updates = plans.map((plan) => ({
      planId: plan._id,
      initialPrice: Number(plan.monthlyPrice[0]?.initialPrice) || 0,
      discount: Number(plan.monthlyPrice[0]?.discount) || 0,
      contactUs: plan.contactUs,
      isActive: plan.isActive,
    }));

    const stateData = {
      globalDiscount: Number(globalDiscount) || 0, // Ensure it's a number
      updates,
    };

    postMonthlySubscriptionPlan.mutate(stateData, {
      onSuccess: () => {
        toast.success("Monthly data saved");
      },
      onError: () => {
        toast.error("Error saving monthly data");
      },
    });

    console.log(JSON.stringify(stateData, null, 2));
  };

  const saveData = () => {
    switch (activeTab) {
      case "trial":
        callTrialData();
        break;
      case "referral":
        callReferralData();
        break;
      case "monthly":
      case "annually":
        callMonthlyData();
        break;
      default:
        console.log("Unknown tab");
    }
  };

  return saveData;
};

export default useSaveSubscriptionData;
