export type TrialPeriodManagementState = {
  period: number;
  periodType: "DAY" | "MONTH";
  title: string;
  body: string;
  tagLine: string;
  setTrialPeriod: (trialPeriod: number) => void;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setTagLine: (tagLine: string) => void;
};

export type TrialPeriodData = {
  data?: any;
  period: number;
  periodType?: "DAY" | "MONTH";
  title: string;
  body: string;
  tagLine: string;
};

export type ReferralPeriodManagementState = {
  getReferralMonth: number;
  giveReferralMonth: number;
  title: string;
  body: string;
  tagLine: string;
  setGetReferralMonths: (months: number) => void;
  setGiveReferralMonths: (months: number) => void;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setTagLine: (tagLine: string) => void;
};

export type ReferralPeriodData = {
  getReferralMonth: number;
  giveReferralMonth: number;
  title: string;
  body: string;
  tagLine: string;
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
  globalDiscount?: number;
  monthlyDiscount?: number;
  yearlyDiscount?: number;
  plans: PlanDetails[];
};

export type TabState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
