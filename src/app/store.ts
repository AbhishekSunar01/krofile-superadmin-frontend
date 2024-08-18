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

type PlanType = "Standard" | "Upgraded" | "Premium" | "Enterprise";

type PlanDetails = {
  price: number;
  discount: number;
  finalPrice: number;
};

type MonthlyPlanState = {
  plans: Record<PlanType | string, PlanDetails>;
  setPrice: (planType: PlanType | string, price: number) => void;
  setDiscount: (planType: PlanType | string, discount: number) => void;
  calculateFinalPrice: (planType: PlanType | string) => void;
  addPlanType: (planType: PlanType | string) => void;
};

export const useMonthlyPlanStore = create<MonthlyPlanState>((set, get) => ({
  plans: {
    Standard: { price: 0, discount: 0, finalPrice: 0 },
    Upgraded: { price: 0, discount: 0, finalPrice: 0 },
    Premium: { price: 0, discount: 0, finalPrice: 0 },
    Enterprise: { price: 0, discount: 0, finalPrice: 0 },
  },
  setPrice: (planType, price) => {
    const plans = get().plans;
    set({
      plans: {
        ...plans,
        [planType]: { ...plans[planType], price },
      },
    });
  },
  setDiscount: (planType, discount) => {
    const plans = get().plans;
    set({
      plans: {
        ...plans,
        [planType]: { ...plans[planType], discount },
      },
    });
  },
  calculateFinalPrice: (planType) => {
    const plans = get().plans;
    const { price, discount } = plans[planType];
    const finalPrice = price - (price * discount) / 100;
    set({
      plans: {
        ...plans,
        [planType]: {
          ...plans[planType],
          finalPrice: parseFloat(finalPrice.toFixed(2)),
        },
      },
    });
  },
  addPlanType: (planType) => {
    const plans = get().plans;
    if (!plans[planType]) {
      set({
        plans: {
          ...plans,
          [planType]: { price: 0, discount: 0, finalPrice: 0 },
        },
      });
    }
  },
}));
