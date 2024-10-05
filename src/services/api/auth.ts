import axios, { AxiosResponse } from "axios";

import Cookies from "js-cookie";
import axiosInstance from ".";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
  data: {
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

interface IVerifyTwoFaOtpResponse {
  status: string;
  message: string;
  data: {
    token: {
      access_token: string;
      refresh_token: string;
    };
  };
}

interface IResendVerifyTwoFaOtpResponse {
  status: string;
  data: {
    message: string;
  };
}

interface IChangePasswordResponse {
  status: string;
  data: {
    message: string;
  };
}

interface IHandleForgetPasswordResponse extends IChangePasswordResponse {}
interface IVerifyForgetPasswordOtpResponse extends IChangePasswordResponse {}

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ILoginResponse> => {
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

export const verifyTwoFaOtp = async ({
  otp,
}: {
  otp: string;
}): Promise<IVerifyTwoFaOtpResponse> => {
  try {
    const response: AxiosResponse<IVerifyTwoFaOtpResponse> =
      await axios.post<IVerifyTwoFaOtpResponse>(
        `${baseUrl}/auth/verifyOtp`,
        {
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("temporary_token")}`,
          },
        }
      );
    return response.data;
  } catch (error) {
    console.error("Error in verifyotp function:", error);
    throw error;
  }
};

export const resendTwoFaOtp = async ({
  email,
}: {
  email: string;
}): Promise<IResendVerifyTwoFaOtpResponse> => {
  try {
    const response: AxiosResponse<IResendVerifyTwoFaOtpResponse> =
      await axios.post<IResendVerifyTwoFaOtpResponse>(
        `${baseUrl}/auth/resend-otp`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("temporary_token")}`,
          },
        }
      );
    return response.data;
  } catch (error) {
    console.error("Error in verifyotp function:", error);
    throw error;
  }
};

export const changePassword = async ({
  oldPassword,
  newPassword,
  confirmPassword,
}: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<IChangePasswordResponse> => {
  try {
    const response: AxiosResponse<IChangePasswordResponse> =
      await axiosInstance.patch<IChangePasswordResponse>(
        `auth/update-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        }
      );
    return response.data;
  } catch (error) {
    console.log("Error in changePassword function", error);
    throw error;
  }
};

export const getLoggedinUser = async (): Promise<ILoggedInUserResponse> => {
  try {
    const response: AxiosResponse<ILoggedInUserResponse> =
      await axiosInstance.get<ILoggedInUserResponse>(`auth/me`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
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

export const handleForgetPassword = async ({
  email,
}: {
  email: string;
}): Promise<IHandleForgetPasswordResponse> => {
  try {
    const response: AxiosResponse<IHandleForgetPasswordResponse> =
      await axiosInstance.post<IHandleForgetPasswordResponse>(
        `auth/forget-password`,
        {
          email,
        }
      );
    return response.data;
  } catch (error) {
    console.error("Error in handleForgetPassword function:", error);
    throw error;
  }
};

export const resetPasswordVerifyOtp = async ({
  otp,
}: {
  otp: string;
}): Promise<IVerifyForgetPasswordOtpResponse> => {
  try {
    const response: AxiosResponse<IVerifyForgetPasswordOtpResponse> =
      await axiosInstance.post<IVerifyForgetPasswordOtpResponse>(
        `auth/verify-reset-otp`,
        {
          otp,
          email: localStorage.getItem("reset-email"),
        }
      );
    return response.data;
  } catch (error) {
    console.error("Error in resetPasswordVerifyOtp function:", error);
    throw error;
  }
};

export const handleResendForgetPasswordOtp = async ({
  email,
}: {
  email: string;
}): Promise<IResendVerifyTwoFaOtpResponse> => {
  // using this as a type as they both are same...
  try {
    const response: AxiosResponse<IResendVerifyTwoFaOtpResponse> =
      await axiosInstance.post<IResendVerifyTwoFaOtpResponse>(
        `auth/resend-reset-otp`,
        {
          email,
        }
      );
    return response.data;
  } catch (error) {
    console.error("Error in handleResendForgetPasswordOtp function:", error);
    throw error;
  }
};

export const handleSetNewPassword = async ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}): Promise<IChangePasswordResponse> => {
  try {
    const response: AxiosResponse<IChangePasswordResponse> =
      await axiosInstance.post<IChangePasswordResponse>(`auth/reset-password`, {
        newPassword: password,
        confirmPassword,
        email: localStorage.getItem("reset-email"),
      });
    return response.data;
  } catch (error) {
    console.error("Error in handleSetNewPassword function:", error);
    throw error;
  }
};
