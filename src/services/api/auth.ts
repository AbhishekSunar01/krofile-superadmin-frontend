import { AxiosResponse } from "axios";

import { axiosInstance } from ".";
import { ILoggedInUserResponse, ILoginResponse } from "../../types/authTypes";
import Cookies from "js-cookie";

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response: AxiosResponse<ILoginResponse> =
      await axiosInstance.post<ILoginResponse>(`auth/signIn`, {
        email,
        password,
      });
    return response.data;
  } catch (error) {
    console.error("Error in handleLogin function:", error);
    throw error;
  }
};

export const getLoggedinUser = async () => {
  try {
    const response: AxiosResponse<ILoggedInUserResponse> =
      await axiosInstance.get<ILoggedInUserResponse>(`auth/me`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error in getLoggedinUser function:", error);
    throw error;
  }
};
