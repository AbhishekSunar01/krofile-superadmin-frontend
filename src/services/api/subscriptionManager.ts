import axiosInstance from ".";
import { ReferralPeriodData, TrialPeriodData } from "../../types/type";

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
    return data.data.data.subscriptionPlans.plans;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
