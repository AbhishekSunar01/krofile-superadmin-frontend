import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { useAnnuallyPlanStore } from "../../app/store";
import { useState } from "react";
import Plan from "./subscriptionPlan/Plan";

export default function AnnuallyPlan() {
  const form = useForm();
  const { plans, setPrice, setDiscount, setActive } = useAnnuallyPlanStore();
  const [mainDiscount, setMainDiscount] = useState(0);
  const [mainDiscountDisabled, setMainDiscountDisabled] = useState(false);
  const [individualDiscountsDisabled, setIndividualDiscountsDisabled] =
    useState(false);

  const calculateFinalPrice = (price: number, discount: number) => {
    return parseFloat((price - (price * discount) / 100).toFixed(2));
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleMainDiscountChange = (e: { target: { value: string } }) => {
    const discount = parseFloat(e.target.value) || 0;
    setMainDiscount(discount);
    setIndividualDiscountsDisabled(discount > 0);

    Object.keys(plans).forEach((planType) => {
      setDiscount(planType, discount);
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
            <Plan
              planType={planType}
              plan={plan}
              finalPrice={finalPrice}
              setPrice={setPrice}
              setActive={setActive}
              setDiscount={setDiscount}
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
