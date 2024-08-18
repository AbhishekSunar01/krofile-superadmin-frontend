import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useMonthlyPlanStore } from "../../app/store";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

export default function MonthlyPlan() {
  const form = useForm();
  const { plans, setPrice, setDiscount } = useMonthlyPlanStore();
  const [mainDiscount, setMainDiscount] = useState(0);
  const [mainDiscountDisabled, setMainDiscountDisabled] = useState(false);
  const [individualDiscountsDisabled, setIndividualDiscountsDisabled] =
    useState(false);

  const calculateFinalPrice = (price, discount) => {
    return parseFloat((price - (price * discount) / 100).toFixed(2));
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleMainDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0;
    setMainDiscount(discount);
    setIndividualDiscountsDisabled(discount > 0);

    Object.keys(plans).forEach((planType) => {
      setDiscount(planType, discount);
    });
  };

  const handleIndividualDiscountChange = (planType, discount) => {
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
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="mainDiscount"
            render={({ field }) => (
              <FormItem className="w-3/5">
                <FormLabel>Discount{`(%)`}</FormLabel>
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
          const finalPrice = calculateFinalPrice(plan.price, plan.discount);

          return (
            <div key={planType} className="space-y-2">
              <div className="flex gap-2 items-center">
                <Switch /> <div className="font-medium">{planType} Plan</div>
              </div>
              <div className="flex w-full gap-4">
                <FormField
                  control={form.control}
                  name={`${planType}.price`}
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Here"
                          {...field}
                          value={field.value ?? plan.price}
                          onChange={(e) =>
                            setPrice(planType, parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${planType}.discount`}
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Here"
                          {...field}
                          value={field.value ?? plan.discount}
                          disabled={individualDiscountsDisabled}
                          onChange={(e) =>
                            handleIndividualDiscountChange(
                              planType,
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${planType}.finalPrice`}
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
            </div>
          );
        })}
      </form>
    </FormProvider>
  );
}
