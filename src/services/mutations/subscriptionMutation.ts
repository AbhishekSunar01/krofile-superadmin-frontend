import { useMutation } from "@tanstack/react-query";
import {
  postMonthlySubscriptionPlan,
  postReferralContent,
  postTrialContent,
} from "../api/subscriptionManager";
import { ReferralPeriodData, TrialPeriodData } from "../../types/type";

export function usePostTrialContent() {
  return useMutation({
    mutationFn: (data: TrialPeriodData) => postTrialContent(data),
    onSuccess: (response) => {
      console.log("Post Trial Content Response:", response);
    },
  });
}

export function usePostReferralContent() {
  return useMutation({
    mutationFn: (data: ReferralPeriodData) => postReferralContent(data),
    onSuccess: (response) => {
      console.log("Post Referral Content Response:", response);
    },
  });
}

export function usePostMonethlySubscriptionPlan() {
  return useMutation({
    mutationFn: (data: any) => postMonthlySubscriptionPlan(data),
    onSuccess: (response) => {
      console.log("Post Subscription Plan Response:", response);
    },
  });
}
