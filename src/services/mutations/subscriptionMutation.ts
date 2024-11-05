import { useMutation } from "@tanstack/react-query";
import {
  postMonthlySubscriptionPlan,
  postReferralContent,
  postTrialContent,
  updateSubscriptionPlan,
} from "../api/subscriptionManager";
import {
  PlanState,
  ReferralPeriodData,
  TrialPeriodData,
} from "../../types/subscriptionManagementTypes";

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

export function useUpdateSinglePlan() {
  return useMutation({
    mutationFn: ({
      data,
      _id,
      type,
    }: {
      data: PlanState;
      _id: string;
      type: string;
    }) => updateSubscriptionPlan({ data, _id, type }),
    onSuccess: (response) => {
      console.log("Update Single Plan Response:", response);
    },
  });
}
