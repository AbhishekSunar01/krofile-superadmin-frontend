import { z } from "zod";

export const notificationSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  url: z.string().url({ message: "Must be a valid URL." }),
  type: z.string().min(2, {
    message: "Type must be selected.",
  }),
  description: z.string().min(100, {
    message: "Description must be at least 100 characters.",
  }),
});
