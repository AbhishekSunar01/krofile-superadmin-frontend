import Cookies from "js-cookie";
import { toast } from "sonner";
import { create } from "zustand";

// Define types for your Zustand store
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

// Create the Zustand store
const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get("access_token") || null,
  refreshToken: Cookies.get("refresh_token") || null,

  // Method to set new tokens
  setTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set("access_token", accessToken, {
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refresh_token", refreshToken, {
      secure: true,
      sameSite: "Strict",
    });

    set({ accessToken, refreshToken });
  },

  // Logout method to clear tokens
  logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.clear();
    toast.success("You are logged out!");
    set({ accessToken: null, refreshToken: null });
  },
}));

export default useAuthStore;
