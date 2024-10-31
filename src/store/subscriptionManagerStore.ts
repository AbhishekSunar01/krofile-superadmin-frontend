import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  ReferralPeriodManagementState,
  TrialPeriodManagementState,
  PlanDetails,
  PriceDetails,
  SubscriptionPlanDetails,
  TabState,
} from "../types/subscriptionManagementTypes";

export const useTabStateStore = create<TabState>((set) => ({
  activeTab: "trial",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export const useTrialPeriodManagementStore =
  create<TrialPeriodManagementState>()(
    devtools(
      persist(
        (set) => ({
          period: 0,
          periodType: "DAY",
          title: "",
          body: "",
          tagline: "",
          setTrialPeriod: (period: number) => set({ period }),
          setTitle: (title: string) => set({ title }),
          setBody: (body: string) => set({ body }),
          setTagLine: (tagline: string) => set({ tagline }),
        }),
        {
          name: "trial-period-management-storage",
        }
      )
    )
  );

export const useReferralPeriodManagementStore =
  create<ReferralPeriodManagementState>()(
    devtools(
      persist(
        (set) => ({
          getReferralMonth: 0,
          giveReferralMonth: 0,
          title: "",
          body: "",
          tagline: "",
          setGetReferralMonths: (months: number) =>
            set({ getReferralMonth: months }),
          setGiveReferralMonths: (months: number) =>
            set({ giveReferralMonth: months }),
          setTitle: (title: string) => set({ title }),
          setBody: (body: string) => set({ body }),
          setTagLine: (tagline: string) => set({ tagline }),
        }),
        {
          name: "referral-period-management-storage",
        }
      )
    )
  );

export const useSubscriptionPlanStore = create<
  SubscriptionPlanDetails & {
    setGlobalDiscount: (globalDiscount: number) => void;
    setPlans: (plans: PlanDetails[]) => void;
    updatePlanField: (
      planId: string,
      field: keyof PlanDetails,
      value: any
    ) => void;
    updatePriceDetails: (
      planId: string,
      priceType: "monthlyPrice" | "yearlyPrice",
      priceDetails: PriceDetails[]
    ) => void;
  }
>()(
  devtools(
    persist(
      (set) => ({
        monthlyDiscount: 0,
        yearlyDiscount: 0,
        globalDiscount: 0,
        plans: [],
        setGlobalDiscount: (globalDiscount) =>
          set({ globalDiscount: globalDiscount }),
        setPlans: (plans) => set({ plans }),
        updatePlanField: (planId, field, value) =>
          set((state) => ({
            plans: state.plans.map((plan) =>
              plan._id === planId ? { ...plan, [field]: value } : plan
            ),
          })),
        updatePriceDetails: (planId, priceType, priceDetails) =>
          set((state) => ({
            plans: state.plans.map((plan) =>
              plan._id === planId
                ? { ...plan, [priceType]: priceDetails }
                : plan
            ),
          })),
      }),
      {
        name: "subscription-plan-storage",
      }
    )
  )
);
