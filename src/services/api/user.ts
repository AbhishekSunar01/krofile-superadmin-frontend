import { AxiosResponse } from "axios";
import axiosInstance from ".";

export const updateUser = async ({ formData }: { formData: FormData }) => {
  try {
    const response: AxiosResponse = await axiosInstance("/auth/update", {
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateUser function:", error);
    throw error;
  }
};
