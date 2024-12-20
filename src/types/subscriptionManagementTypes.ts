export type TrialPeriodManagementState = {
  period: number;
  periodType: "DAY" | "MONTH";
  title: string;
  body: string;
  tagline: string;
  setTrialPeriod: (trialPeriod: number) => void;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setTagLine: (tagline: string) => void;
};

export type TrialPeriodData = {
  data?: any;
  period: number;
  periodType?: "DAY" | "MONTH";
  title: string;
  body: string;
  tagline: string;
};

export type ReferralPeriodManagementState = {
  getReferralMonth: number;
  giveReferralMonth: number;
  title: string;
  body: string;
  tagline: string;
  setGetReferralMonths: (months: number) => void;
  setGiveReferralMonths: (months: number) => void;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setTagLine: (tagline: string) => void;
};

export type ReferralPeriodData = {
  getReferralMonth: number;
  giveReferralMonth: number;
  title: string;
  body: string;
  tagline: string;
};

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
  globalDiscount?: number;
  plans: PlanDetails[];
};

export type TabState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type PlanState = {
  title: string;
  initialPrice: number;
  discount: number;
  contactUs: boolean;
};
