import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { notificationSchema } from "../../utils/schemas/notificationSchema";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function NotificationForm() {
  const { selectedValue, setSelectedValue } = useNotificationType();
  const form = useForm({
    resolver: zodResolver(notificationSchema),
    mode: "onChange", // Ensure validation is triggered on change
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      url: "",
      type: "",
      description: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleRadioChange = async (value: string) => {
    const isValid = await form.trigger();
    if (isValid || value === "notificationform") {
      setSelectedValue(value);
    }
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
          render={({}) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                {/* <Input placeholder="Enter type" {...field} /> */}
                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Types</SelectLabel>
                          <SelectItem value="System Update">
                            System Update
                          </SelectItem>
                          <SelectItem value="Maintenance">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="Promotions and Offers">
                            Promotions and Offers
                          </SelectItem>
                          <SelectItem value="Compliance and Policy">
                            Compliance and Policy
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
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

        <h5 className="mt-4 mb-2 font-medium">Push Notification To*</h5>
        <div>
          <RadioGroup
            value={selectedValue}
            onValueChange={handleRadioChange}
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

        <div className="w-full flex justify-end mt-4">
          <Button
            type="submit"
            variant={isValid ? "default" : "disabled"}
            size={"lg"}
          >
            Send Notification
          </Button>
        </div>
      </form>
    </Form>
  );
}
