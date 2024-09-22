import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        isVerified: false,
        setAccessToken: (accessToken) => set({ accessToken }),
        setIsVerified: (isVerified) => set({ isVerified }),
        clearAccessToken: () => set({ accessToken: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   setToken: (token) => set({ token }),
//   clearToken: () => set({ token: null }),
// }));
