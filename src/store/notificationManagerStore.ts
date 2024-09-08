import { create } from "zustand";

interface NotificationType {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export const useNotificationType = create<NotificationType>((set) => ({
  selectedValue: "notificationform",
  setSelectedValue: (value) => set({ selectedValue: value }),
}));

interface IndustryTypes {
  industryType: string;
  businessIds: Array<string>;
}

interface CustomNotificationType {
  title: string;
  startDate: string;
  endDate: string;
  url: string;
  type: string;
  description: string;
  indestryTypes: IndustryTypes;
}

export const useCustomBusinessNotification = create<CustomNotificationType>();
