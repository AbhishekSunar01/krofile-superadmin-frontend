import create from "zustand";

interface NotificationType {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export const useNotificationType = create<NotificationType>((set) => ({
  selectedValue: "notificationform",
  setSelectedValue: (value) => set({ selectedValue: value }),
}));
