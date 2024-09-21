import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { handleLogin } from "../api/loginapi";

export function useLoginUser() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return handleLogin(email, password);
    },
    onMutate: () => {
      console.log("Mutation started");
    },
    onSuccess: (data) => {
      // console.log("Mutation successful", data);
      if (data) {
        localStorage.setItem("token", data.data.token.access_token);
        localStorage.setItem("refreshToken", data.data.token.refresh_token);
      }
    },
    onError: (error) => {
      // console.log("Mutation failed", error); // Add explicit error logging

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      }
    },
    onSettled: () => {
      console.log("Mutation settled");
    },
  });
}
