import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { usePlanStore } from "../../app/store";
import Plan from "./subscriptionPlan/Plan";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";

export default function MonthlyPlan() {
  const form = useForm();
  const {
    plans,
    setMonthlyPrice,
    setDiscount,
    setActive,
    calculateFinalPrice,
  } = usePlanStore();
  const [mainDiscount, setMainDiscount] = useState(0);
  const [mainDiscountDisabled, setMainDiscountDisabled] = useState(false);
  const [individualDiscountsDisabled, setIndividualDiscountsDisabled] =
    useState(false);

  const handleMainDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discount = parseFloat(e.target.value) || 0;
    setMainDiscount(discount);
    setIndividualDiscountsDisabled(discount > 0);

    Object.keys(plans).forEach((planType) => {
      setDiscount(planType, discount);
      calculateFinalPrice(planType);
    });
  };

  const handleIndividualDiscountChange = (
    planType: string,
    discount: number
  ) => {
    if (discount > 0) {
      setMainDiscountDisabled(true);
      setIndividualDiscountsDisabled(false);
    } else {
      const otherDiscountsSet = Object.keys(plans).some(
        (type) => type !== planType && plans[type].discount > 0
      );
      if (!otherDiscountsSet) {
        setMainDiscountDisabled(false);
        setIndividualDiscountsDisabled(false);
      }
    }
    setDiscount(planType, discount);
    calculateFinalPrice(planType);
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-4 p-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="mainDiscount"
            render={({ field }) => (
              <FormItem className="w-3/5">
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter discount for all plans"
                    {...field}
                    value={mainDiscount}
                    disabled={mainDiscountDisabled}
                    onChange={handleMainDiscountChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {Object.keys(plans).map((planType) => {
          const plan = plans[planType];
          const finalPrice = plan.monthlyFinalPrice;

          return (
            <Plan
              key={planType}
              planType={planType}
              plan={plan}
              finalPrice={finalPrice}
              setPrice={setMonthlyPrice}
              setActive={setActive}
              setDiscount={setDiscount}
              individualDiscountsDisabled={individualDiscountsDisabled}
              handleIndividualDiscountChange={handleIndividualDiscountChange}
              control={form.control}
              isMonthly={true}
            />
          );
        })}

        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Switch />
            <div className="font-medium">Basic</div>
          </div>
          <div className="flex w-full gap-4">
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Monthly Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Here" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
            />
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Here"
                      {...field}
                      disabled={individualDiscountsDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
            />
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Final Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Here" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
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
        </div>
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Switch />
            <div className="font-medium">Basic</div>
          </div>
          <div className="flex w-full gap-4">
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Monthly Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Here" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
            />
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Here"
                      {...field}
                      disabled={individualDiscountsDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
            />
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Final Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Here" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
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
        </div>
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Switch />
            <div className="font-medium">Basic</div>
          </div>
          <div className="flex w-full gap-4">
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Monthly Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Here" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
            />
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Here"
                      {...field}
                      disabled={individualDiscountsDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
            />
            <FormField
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormLabel>Final Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Here" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={""}
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
        </div>
      </form>
    </FormProvider>
  );
}
