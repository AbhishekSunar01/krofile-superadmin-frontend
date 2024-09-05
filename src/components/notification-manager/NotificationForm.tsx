import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import TextFormatter from "../custom-ui/TextFormatter";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useNotificationType } from "../../store/notificationManagerStore";

const notificationSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  url: z.string().min(2, {
    message: "URL must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Type must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export default function NotificationForm() {
  const { selectedValue, setSelectedValue } = useNotificationType();
  const form = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      url: "",
      type: "",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <h4>Create New Notification</h4>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div className="p-4 mt-2 rounded-lg border flex flex-col items-start gap-2">
                  <TextFormatter />
                  <Textarea
                    className="bg-mainBg h-16"
                    placeholder="Type here..."
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

      <h5 className="mt-4 mb-2 font-medium">Push Notification To*</h5>
      <div>
        <RadioGroup
          value={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="notificationform">
              <input
                type="radio"
                value="notificationform"
                checked={selectedValue === "notificationform"}
              />
            </RadioGroupItem>
            All
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="hello">
              <input
                type="radio"
                value="hello"
                checked={selectedValue === "hello"}
              />
            </RadioGroupItem>
            Custom Business
          </div>
        </RadioGroup>
      </div>
    </Form>
  );
}
