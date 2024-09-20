import { axiosInstance } from ".";
import { AdminLogin } from "../../types/type";

export const login = async (data: AdminLogin) => {
  try {
    return await axiosInstance.post("auth/signIn", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
