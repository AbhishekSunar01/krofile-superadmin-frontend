import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { AdminLogin } from "../../types/type";
import { useAuthStore } from "../../store/authStore";

export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (data: AdminLogin) => login(data),
    onSuccess: (response) => {
      const { access_token, refresh_token } = response.data.data.token;
      setToken(access_token);
      localStorage.setItem("refresh_token", refresh_token);
      console.log("Access Token:", access_token);
      console.log("Refresh Token:", refresh_token);
    },
  });
}
