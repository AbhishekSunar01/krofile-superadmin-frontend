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
          trialPeriod: 0,
          title: "",
          body: "",
          tagLine: "",
          setTrialPeriod: (trialPeriod: number) => set({ trialPeriod }),
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
          getReferralMonths: 0,
          giveReferralMonths: 0,
          title: "",
          body: "",
          tagLine: "",
          setGetReferralMonths: (months: number) =>
            set({ getReferralMonths: months }),
          setGiveReferralMonths: (months: number) =>
            set({ giveReferralMonths: months }),
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
