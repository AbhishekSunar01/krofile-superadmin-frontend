import { format } from "date-fns";

export const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  return format(formattedDate, "MMM dd, yyyy");
};
