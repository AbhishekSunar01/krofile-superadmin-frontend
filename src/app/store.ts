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

type MonthlyPlanState = {
  price: string;
  discount: string;
  finalPrice: string;
  planType: PlanType;
  setPrice: (price: string) => void;
  setDiscount: (discount: string) => void;
  calculateFinalPrice: () => void;
  setPlanType: (planType: PlanType) => void;
};

export const useMonthlyPlanStore = create<MonthlyPlanState>((set, get) => ({
  price: "",
  discount: "",
  finalPrice: "",
  planType: "Standard",
  setPrice: (price) => set({ price }),
  setDiscount: (discount) => set({ discount }),
  calculateFinalPrice: () => {
    const { price, discount } = get();
    const priceValue = parseFloat(price) || 0;
    const discountValue = parseFloat(discount) || 0;
    const finalPrice = priceValue - (priceValue * discountValue) / 100;
    set({ finalPrice: finalPrice.toFixed(2) });
  },
  setPlanType: (planType) => set({ planType }),
}));
