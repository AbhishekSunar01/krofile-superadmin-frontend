import { create } from "zustand";
import {
  ReferralPeriodManagementState,
  TrialPeriodManagementState,
} from "../types/type";
import { devtools, persist } from "zustand/middleware";

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
