import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { handleLogin } from "../api/auth";

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
