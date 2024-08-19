import { Checkbox } from "../../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Switch } from "../../ui/switch";
import { Input } from "../../ui/input";
import { Control } from "react-hook-form";

interface PlanProps {
  planType: string;
  plan: {
    price: number;
    discount: number;
    finalPrice?: number;
    isActive: boolean;
  };
  finalPrice: number;
  setPrice: (planType: string, price: number) => void;
  setDiscount: (planType: string, discount: number) => void;
  setActive: (planType: string, isActive: boolean) => void;
  individualDiscountsDisabled: boolean;
  handleIndividualDiscountChange: (planType: string, discount: number) => void;
  control: Control<any>;
}

export default function Plan({
  planType,
  plan,
  finalPrice,
  setPrice,
  setActive,
  individualDiscountsDisabled,
  handleIndividualDiscountChange,
  control,
}: PlanProps) {
  return (
    <div key={planType} className="space-y-2">
      <div className="flex gap-2 items-center">
        <Switch
          checked={plan.isActive}
          onCheckedChange={(checked) => setActive(planType, checked)}
        />{" "}
        <div className="font-medium">{planType} Plan</div>
      </div>
      <div className="flex w-full gap-4">
        <FormField
          control={control}
          name={`${planType}.price`}
          render={({ field }) => (
            <FormItem className="w-3/5">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Here"
                  {...field}
                  value={plan.price}
                  onChange={(e) => {
                    const price = parseFloat(e.target.value) || 0;
                    setPrice(planType, price);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${planType}.discount`}
          render={({ field }) => (
            <FormItem className="w-3/5">
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Here"
                  {...field}
                  value={plan.discount}
                  disabled={individualDiscountsDisabled}
                  onChange={(e) => {
                    const discount = parseFloat(e.target.value) || 0;
                    handleIndividualDiscountChange(planType, discount);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
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
}
