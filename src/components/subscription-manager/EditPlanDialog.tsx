import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import editPen from "../../assets/svg/editIcon.svg";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PlanDetails } from "../../types/subscriptionManagementTypes";
import { useEffect } from "react";
import { useUpdateSinglePlan } from "../../services/mutations/subscriptionMutation";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  initialPrice: z.number().min(0, "Initial price must be a positive number"),
  discount: z.number().min(0, "Discount must be a positive number"),
  contactUs: z.boolean(),
});

interface EditPlanDialogProps {
  plan: PlanDetails;
}

export default function EditPlanDialog({ plan }: EditPlanDialogProps) {
  const planId = plan._id;
  const updatePlan = useUpdateSinglePlan();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      initialPrice: 0,
      discount: 0,
      contactUs: false,
    },
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        title: plan.title,
        initialPrice: plan.monthlyPrice[0]?.initialPrice || 0,
        discount: plan.monthlyPrice[0]?.discount || 0,
        contactUs: plan.contactUs,
      });
    }
  }, [plan, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updatePlan.mutate({
      data: {
        title: data.title,
        initialPrice: data.initialPrice,
        discount: data.discount,
        contactUs: data.contactUs,
      },
      _id: planId,
      type: "monthly",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src={editPen} className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Plan</DialogTitle>
          <DialogDescription>
            Update the details of the subscription plan.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <FormField
              control={form.control}
              name="initialPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter initial price"
                      {...field}
                      type="number"
                      value={field.value || ""} // Ensure value is controlled
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter discount"
                      {...field}
                      type="number"
                      value={field.value || ""} // Ensure value is controlled
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactUs"
              render={({}) => (
                <FormItem>
                  <FormLabel>Contact Us</FormLabel>
                  <FormControl>
                    {/* <input type="checkbox" {...field} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="w-full flex">
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
