import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  changePassword,
  handleForgetPassword,
  handleLogin,
  handleLogout,
  handleResendForgetPasswordOtp,
  handleSetNewPassword,
  resendTwoFaOtp,
  resetPasswordVerifyOtp,
  verifyTwoFaOtp,
} from "../api/auth";

export function useLoginUser() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return handleLogin({ email, password });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function useVerifyTwoFaOtp() {
  return useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      return verifyTwoFaOtp({ otp });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function useResendTwoFaOtp() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return resendTwoFaOtp({ email });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      oldPassword,
      newPassword,
      confirmPassword,
    }: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      return changePassword({ oldPassword, newPassword, confirmPassword });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function logoutUser() {
  return useMutation({
    mutationFn: async () => handleLogout,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function useForgetPassword() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return handleForgetPassword({ email });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function useResetPasswordVerifyOtp() {
  return useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      return resetPasswordVerifyOtp({ otp });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function useResendForgetPasswordOtp() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return handleResendForgetPasswordOtp({ email });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}

export function useSetNewPassword({
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return useMutation({
    mutationFn: async () => {
      return handleSetNewPassword({ password, confirmPassword });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "Internal server error! Something went wrong!"
        );
      }
    },
  });
}
