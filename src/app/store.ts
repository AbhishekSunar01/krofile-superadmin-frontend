import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ContentManagementState = {
  title: string;
  body: string;
  tagLine: string;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setTagLine: (tagLine: string) => void;
};

export const useContentManagementStore = create<ContentManagementState>()(
  devtools(
    persist(
      (set) => ({
        title: "Welcome to the site",
        body: "This is the body of the site",
        tagLine: "This is the tagline",
        setTitle: (title: string) => set({ title }),
        setBody: (body: string) => set({ body }),
        setTagLine: (tagLine: string) => set({ tagLine }),
      }),
      {
        name: "content-management-storage",
      }
    )
  )
);

type PlanDetails = {
  name: string;
  monthlyPrice: number;
  annuallyPrice: number;
  discount: number;
  monthlyFinalPrice: number;
  yearlyFinalPrice: number;
  isActive: boolean;
};

type PlanState = {
  plans: Record<string, PlanDetails>;
  setMonthlyPrice: (planType: string, price: number) => void;
  setDiscount: (planType: string, discount: number) => void;
  calculateFinalPrice: (planType: string) => void;
  addPlanType: (planType: string) => void;
  setActive: (planType: string, isActive: boolean) => void;
};

export const usePlanStore = create<PlanState>()(
  devtools(
    persist(
      (set, get) => ({
        plans: {
          Standard: {
            name: "Standard",
            monthlyPrice: 0,
            annuallyPrice: 0,
            discount: 0,
            monthlyFinalPrice: 0,
            yearlyFinalPrice: 0,
            isActive: false,
          },
          Upgraded: {
            name: "Upgraded",
            monthlyPrice: 0,
            annuallyPrice: 0,
            discount: 0,
            monthlyFinalPrice: 0,
            yearlyFinalPrice: 0,
            isActive: false,
          },
          Premium: {
            name: "Premium",
            monthlyPrice: 0,
            annuallyPrice: 0,
            discount: 0,
            monthlyFinalPrice: 0,
            yearlyFinalPrice: 0,
            isActive: false,
          },
          Enterprise: {
            name: "Enterprise",
            monthlyPrice: 0,
            annuallyPrice: 0,
            discount: 0,
            monthlyFinalPrice: 0,
            yearlyFinalPrice: 0,
            isActive: false,
          },
        },
        setMonthlyPrice: (planType, price) => {
          const plans = get().plans;
          set({
            plans: {
              ...plans,
              [planType]: {
                ...plans[planType],
                monthlyPrice: price,
                annuallyPrice: price * 12, // Update annual price
              },
            },
          });
          get().calculateFinalPrice(planType);
        },
        setDiscount: (planType, discount) => {
          const plans = get().plans;
          set({
            plans: {
              ...plans,
              [planType]: { ...plans[planType], discount },
            },
          });
          get().calculateFinalPrice(planType);
        },
        calculateFinalPrice: (planType) => {
          const plans = get().plans;
          const { monthlyPrice, discount } = plans[planType];
          const monthlyFinalPrice =
            monthlyPrice - (monthlyPrice * discount) / 100;
          const annuallyPrice = monthlyPrice * 12;
          const additionalAnnualDiscount = 5; // Example additional discount for annual plans
          const yearlyFinalPrice =
            annuallyPrice -
            (annuallyPrice * (discount + additionalAnnualDiscount)) / 100;
          set({
            plans: {
              ...plans,
              [planType]: {
                ...plans[planType],
                monthlyFinalPrice: parseFloat(monthlyFinalPrice.toFixed(2)),
                annuallyPrice: parseFloat(annuallyPrice.toFixed(2)),
                yearlyFinalPrice: parseFloat(yearlyFinalPrice.toFixed(2)),
              },
            },
          });
        },
        addPlanType: (planType) => {
          const plans = get().plans;
          set({
            plans: {
              ...plans,
              [planType]: {
                name: planType,
                monthlyPrice: 0,
                annuallyPrice: 0,
                discount: 0,
                monthlyFinalPrice: 0,
                yearlyFinalPrice: 0,
                isActive: false,
              },
            },
          });
        },
        setActive: (planType, isActive) => {
          const plans = get().plans;
          set({
            plans: {
              ...plans,
              [planType]: { ...plans[planType], isActive },
            },
          });
        },
      }),
      {
        name: "plan-storage",
      }
    )
  )
);
