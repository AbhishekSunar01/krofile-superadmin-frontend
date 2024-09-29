export type PriceDetails = {
  initialPrice: number;
  discount: number;
  finalPrice: number;
};

export type PlanDetails = {
  _id: string;
  title: string;
  isActive: boolean;
  contactUs: boolean;
  recommended: boolean;
  monthlyPrice: PriceDetails[];
  yearlyPrice: PriceDetails[];
};

export type SubscriptionPlanDetails = {
  monthlyDiscount: number;
  yearlyDiscount: number;
  plans: PlanDetails[];
};
