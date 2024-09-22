import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ILoggedInUserData, ILoggedInUserDataState } from "../types/authTypes";

export const useUserStore = create<ILoggedInUserDataState>()(
  devtools(
    persist(
      (set) => ({
        userData: {
          _id: "",
          name: "",
          email: "",
          role: "",
          loginAttempts: 0,
          enable2fa: false,
          disabled_by_admin: false,
          loginDevices: [],
        },
        setLoggedInUserData: (userData: ILoggedInUserData) => set({ userData }),
        clearLoggedInUserData: () =>
          set({
            userData: {
              _id: "",
              name: "",
              email: "",
              role: "",
              loginAttempts: 0,
              enable2fa: false,
              disabled_by_admin: false,
              loginDevices: [],
            },
          }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
