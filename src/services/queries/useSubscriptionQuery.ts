import { useQuery } from "@tanstack/react-query";
import {
  getReferralContent,
  getTrialContent,
} from "../api/subscriptionManager";

export function useGetTrialContent() {
  return useQuery({
    queryKey: ["trialContent"],
    queryFn: getTrialContent,
  });
}

export function useGetReferralContent() {
  return useQuery({
    queryKey: ["referralContent"],
    queryFn: getReferralContent,
  });
}
