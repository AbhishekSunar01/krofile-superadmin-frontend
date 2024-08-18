import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMonthlyPlanStore } from "../../app/store";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

export default function MonthlyPlan() {
  const form = useForm();
  const {
    price,
    discount,
    finalPrice,
    setPrice,
    setDiscount,
    calculateFinalPrice,
  } = useMonthlyPlanStore();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    calculateFinalPrice();
  }, [price, discount, calculateFinalPrice]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-4">
        <div className="flex gap-2 items-center">
          <Switch /> <div className="font-medium">Standard</div>
        </div>
        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-3/5">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Here"
                    {...field}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
              <FormItem className="w-3/5">
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Here"
                    {...field}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="finalPrice"
            render={({ field }) => (
              <FormItem className="w-3/5">
                <FormLabel>Final Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Here"
                    {...field}
                    value={finalPrice}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center pt-2 space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Contact Us
          </label>
        </div>
      </form>
    </Form>
  );
}
