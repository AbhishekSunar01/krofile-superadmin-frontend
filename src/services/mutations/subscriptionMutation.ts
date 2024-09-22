import { useMutation } from "@tanstack/react-query";
import { postTrialContent } from "../api/subscriptionManager";
import { TrialPeriodData } from "../../types/type";

export function usePostTrialContent() {
  return useMutation({
    mutationFn: (data: TrialPeriodData) => postTrialContent(data),
    onSuccess: (response) => {
      console.log("Post Trial Content Response:", response);
    },
  });
}
