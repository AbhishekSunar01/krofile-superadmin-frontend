import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { removeAvatar, updateUser } from "../api/user";

export function useUserUpdate() {
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      return updateUser({ formData });
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

export function useRemoveAvatar() {
  return useMutation({
    mutationFn: async () => {
      return removeAvatar();
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
