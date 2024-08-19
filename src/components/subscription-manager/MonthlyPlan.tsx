import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { useMonthlyPlanStore } from "../../app/store";
import { useState } from "react";
import Plan from "./subscriptionPlan/Plan";

export default function MonthlyPlan() {
  const form = useForm();
  const { plans, setPrice, setDiscount, setActive } = useMonthlyPlanStore();
  const [mainDiscount, setMainDiscount] = useState(0);
  const [mainDiscountDisabled, setMainDiscountDisabled] = useState(false);
  const [individualDiscountsDisabled, setIndividualDiscountsDisabled] =
    useState(false);

  const handleMainDiscountChange = (e: { target: { value: string } }) => {
    const discount = parseFloat(e.target.value) || 0;
    setMainDiscount(discount);
    setIndividualDiscountsDisabled(discount > 0);

    Object.keys(plans).forEach((planType) => {
      setDiscount(planType, discount); // Update store directly
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
    setDiscount(planType, discount); // Update store directly
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
          const finalPrice = plan.price - (plan.price * plan.discount) / 100;

          return (
            <Plan
              key={planType}
              planType={planType}
              plan={plan}
              finalPrice={finalPrice}
              setPrice={setPrice}
              setDiscount={setDiscount}
              setActive={setActive}
              individualDiscountsDisabled={individualDiscountsDisabled}
              handleIndividualDiscountChange={handleIndividualDiscountChange}
              control={form.control}
            />
          );
        })}
      </form>
    </FormProvider>
  );
}
