import axios from "axios";
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
interface PlanDetails {
  name: string;
  monthlyPrice: number;
  annuallyPrice: number;
  discount: number;
  monthlyFinalPrice: number;
  yearlyFinalPrice: number;
  isActive: boolean;
}

// Define the PlanState type for Zustand state
interface PlanState {
  plans: Record<string, PlanDetails>;
  setMonthlyPrice: (planType: string, price: number) => void;
  setDiscount: (planType: string, discount: number) => void;
  calculateFinalPrice: (planType: string) => void;
  setActive: (planType: string, isActive: boolean) => void;
  loadPlansFromJSON: () => Promise<void>;
}

export const usePlanStore = create<PlanState>()(
  devtools(
    persist(
      (set, get) => ({
        plans: {},

        // Set monthly price for a specific plan
        setMonthlyPrice: (planType, price) => {
          const plans = get().plans;
          set({
            plans: {
              ...plans,
              [planType]: {
                ...plans[planType],
                monthlyPrice: price,
              },
            },
          });
          get().calculateFinalPrice(planType);
        },

        // Set discount for a specific plan
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

        // Calculate final prices based on discount
        calculateFinalPrice: (planType) => {
          const plans = get().plans;
          const { monthlyPrice, discount } = plans[planType];
          const monthlyFinalPrice =
            monthlyPrice - (monthlyPrice * discount) / 100;
          const annuallyPrice = monthlyPrice * 12;
          const yearlyFinalPrice =
            annuallyPrice - (annuallyPrice * discount) / 100;
          set({
            plans: {
              ...plans,
              [planType]: {
                ...plans[planType],
                monthlyFinalPrice: parseFloat(monthlyFinalPrice.toFixed(2)),
                yearlyFinalPrice: parseFloat(yearlyFinalPrice.toFixed(2)),
              },
            },
          });
        },

        // Set active status for a specific plan
        setActive: (planType, isActive) => {
          const plans = get().plans;
          set({
            plans: {
              ...plans,
              [planType]: { ...plans[planType], isActive },
            },
          });
        },

        // Fetch plans from the backend and update the store
        loadPlansFromJSON: async () => {
          try {
            const response = await axios.get(
              "http://localhost:8000/subscription/plans"
            );
            const jsonData = response.data;

            const mappedPlans = jsonData.data.subscriptionPlans.plans.reduce(
              (acc: Record<string, PlanDetails>, plan: any) => {
                acc[plan.title] = {
                  name: plan.title,
                  monthlyPrice: parseFloat(plan.monthlyPrice[0].initialPrice),
                  annuallyPrice:
                    parseFloat(plan.yearlyPrice[0].initialPrice) * 12,
                  discount: plan.monthlyPrice[0].discount,
                  monthlyFinalPrice: parseFloat(
                    plan.monthlyPrice[0].finalPrice
                  ),
                  yearlyFinalPrice: parseFloat(plan.yearlyPrice[0].finalPrice),
                  isActive: plan.isActive,
                };
                return acc;
              },
              {}
            );

            set({ plans: mappedPlans });
          } catch (error) {
            console.error("Error fetching subscription plans:", error);
          }
        },
      }),
      {
        name: "plan-storage",
      }
    )
  )
);
