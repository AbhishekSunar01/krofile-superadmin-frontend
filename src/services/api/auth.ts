import { AxiosResponse } from "axios";

import Cookies from "js-cookie";
import axiosInstance from ".";


export interface ILoginResponse {
  status: string;
  data: {
    message: string;
    token: {
      access_token: string;
      refresh_token: string;
    };
  };
}

export interface ILoggedInUserResponse {
  status: string;
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    loginAttempts: number;
    enable2fa: boolean;
    disabled_by_admin: boolean;
    loginDevices: {
      deviceId: string;
      devicename: string;
      hashRt: string;
      isTwoFactorAuthenticated: boolean;
      lastUsedAt: string;
      _id: string;
    }[];
  };
}

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

interface ILogoutResponse {
  status: string;
  message: string;
}

export const handleLogout = async () => {
  try {
    const response: AxiosResponse<ILogoutResponse> =
      await axiosInstance.post<ILogoutResponse>("auth/logout", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error in handleLogout function:", error);
    throw error;
  }
};
