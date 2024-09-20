import { axiosInstance } from ".";
import { TrialPeriodManagementState } from "../../types/type";

export const postTrialContent = async (data: TrialPeriodManagementState) => {
  try {
    return await axiosInstance.post("subscription/trial", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSubscriptionPlans = async () => {
  try {
    return await axiosInstance.get("subscription");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
