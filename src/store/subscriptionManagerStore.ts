import { create } from "zustand";
import {
  ReferralPeriodManagementState,
  TrialPeriodManagementState,
} from "../types/type";
import { devtools, persist } from "zustand/middleware";
import {
  PlanDetails,
  PriceDetails,
  SubscriptionPlanDetails,
} from "../types/subscriptionManagementTypes";

export const useTrialPeriodManagementStore =
  create<TrialPeriodManagementState>()(
    devtools(
      persist(
        (set) => ({
          period: 0,
          periodType: "DAY",
          title: "",
          body: "",
          tagLine: "",
          setTrialPeriod: (period: number) => set({ period }),
          setTitle: (title: string) => set({ title }),
          setBody: (body: string) => set({ body }),
          setTagLine: (tagLine: string) => set({ tagLine }),
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
          tagLine: "",
          setGetReferralMonths: (months: number) =>
            set({ getReferralMonth: months }),
          setGiveReferralMonths: (months: number) =>
            set({ giveReferralMonth: months }),
          setTitle: (title: string) => set({ title }),
          setBody: (body: string) => set({ body }),
          setTagLine: (tagLine: string) => set({ tagLine }),
        }),
        {
          name: "referral-period-management-storage",
        }
      )
    )
  );

export const useSubscriptionPlanStore = create<
  SubscriptionPlanDetails & {
    setMonthlyDiscount: (discount: number) => void;
    setYearlyDiscount: (discount: number) => void;
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
        plans: [],
        setMonthlyDiscount: (discount) => set({ monthlyDiscount: discount }),
        setYearlyDiscount: (discount) => set({ yearlyDiscount: discount }),
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
