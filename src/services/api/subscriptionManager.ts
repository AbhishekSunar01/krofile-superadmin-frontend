import axiosInstance from ".";
import {
  ReferralPeriodData,
  TrialPeriodData,
} from "../../types/subscriptionManagementTypes";

export const postTrialContent = async (data: TrialPeriodData) => {
  try {
    return await axiosInstance.post("subscription/content/trial", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrialContent = async () => {
  try {
    const postTrialContent = await axiosInstance.get(
      "subscription/content?type=trial"
    );
    return postTrialContent.data.data.subscriptionContent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReferralContent = async (data: ReferralPeriodData) => {
  try {
    return await axiosInstance.post("subscription/content/referral", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReferralContent = async () => {
  try {
    const postReferralContent = await axiosInstance.get(
      "subscription/content?type=referral"
    );
    return postReferralContent.data.data.subscriptionContent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSubscriptionPlans = async () => {
  try {
    const data = await axiosInstance.get("subscription/plans");
    return data.data.data.subscriptionPlans;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postMonthlySubscriptionPlan = async (data: any) => {
  try {
    // Validate data before sending
    data.updates.forEach((update: any, index: number) => {
      if (typeof update.initialPrice !== "number") {
        throw new Error(`updates.${index}.initialPrice must be a number`);
      }
      if (typeof update.discount !== "number") {
        throw new Error(`updates.${index}.discount must be a number`);
      }
      if (update.discount > 100) {
        throw new Error(
          `updates.${index}.discount must not be greater than 100`
        );
      }
    });

    // Log the data being sent
    console.log("Sending data:", JSON.stringify(data, null, 2));

    return await axiosInstance.put("subscription/plans?type=monthly", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postAnnuallySubscriptionPlan = async (data: any) => {
  try {
    return await axiosInstance.post("subscription/plans/annually", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
