// import {
//   usePostTrialContent,
//   usePostReferralContent,
//   usePostMonethlySubscriptionPlan,
// } from "../services/mutations/subscriptionMutation";
// import { useSubscriptionPlanStore } from "../store/subscriptionManagerStore";

// const useSaveSubscriptionData = () => {
//   const postTrialMutation = usePostTrialContent();
//   const postReferralMutation = usePostReferralContent();
//   const postMonthlySubscriptionPlan = usePostMonethlySubscriptionPlan();

//   const plans = useSubscriptionPlanStore((state) => state.plans);

//   const logStateData = () => {
//     const updates = plans.map((plan) => ({
//       planId: plan._id,
//       initialPrice: Number(plan.monthlyPrice[0]?.initialPrice) || 0,
//       discount: Number(plan.monthlyPrice[0]?.discount) || 0,
//       contactUs: plan.contactUs,
//       isActive: plan.isActive,
//     }));

//     const stateData = {
//       globalDiscount: 0,
//       updates,
//     };

//     postMonthlySubscriptionPlan.mutate(stateData);

//     console.log(JSON.stringify(stateData, null, 2));
//   };

//   const saveData = (type: "trial" | "referral" | "monthly", data: any) => {
//     // switch (type) {
//     //   case "trial":
//     //     postTrialMutation.mutate(data);
//     //     break;
//     //   case "referral":
//     //     postReferralMutation.mutate(data);
//     //     break;
//     //   case "monthly":
//     //     logStateData();
//     //     break;
//     //   default:
//     //     break;
//     // }
//     logStateData();
//   };

//   return saveData;
// };

// export default useSaveSubscriptionData;

import { usePostMonethlySubscriptionPlan } from "../services/mutations/subscriptionMutation";
import { useSubscriptionPlanStore } from "../store/subscriptionManagerStore";

const useSaveSubscriptionData = () => {
  const postMonthlySubscriptionPlan = usePostMonethlySubscriptionPlan();

  const plans = useSubscriptionPlanStore((state) => state.plans);

  const logStateData = () => {
    const updates = plans.map((plan) => ({
      planId: plan._id,
      initialPrice: Number(plan.monthlyPrice[0]?.initialPrice) || 0,
      discount: Number(plan.monthlyPrice[0]?.discount) || 0,
      contactUs: plan.contactUs,
      isActive: plan.isActive,
    }));

    const stateData = {
      globalDiscount: 0,
      updates,
    };

    postMonthlySubscriptionPlan.mutate(stateData);

    console.log(JSON.stringify(stateData, null, 2));
  };

  const saveData = () => {
    logStateData();
  };

  return saveData;
};

export default useSaveSubscriptionData;
