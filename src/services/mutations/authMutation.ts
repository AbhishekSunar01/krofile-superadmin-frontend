import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  handleLogin,
  handleLogout,
  resendTwoFaOtp,
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
        toast.error(error.response?.data.message || "Something went wrong");
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
        toast.error(error.response?.data.message || "Something went wrong");
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
        toast.error(error.response?.data.message || "Something went wrong");
      }
    },
  });
}

export function logoutUser() {
  return useMutation({
    mutationFn: async () => handleLogout,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      }
    },
  });
}
