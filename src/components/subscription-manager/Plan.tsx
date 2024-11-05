import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface PlanProps {
  planType: string;
  plan: {
    name: string;
    monthlyPrice?: number;
    annuallyPrice?: number;
    discount: number;
    isActive: boolean;
    contactUs: boolean;
  };
  isMonthly: boolean;
}

export default function Plan({ planType, plan, isMonthly }: PlanProps) {
  // Initialize state with backend data (plan props)
  const [monthlyPrice, setMonthlyPrice] = useState<number | string>(
    plan.monthlyPrice || ""
  );
  const [annuallyPrice, setAnnuallyPrice] = useState<number | string>(
    plan.annuallyPrice || ""
  );
  const [discount, setDiscount] = useState<number | string>(plan.discount || 0);

  // Effect to update state when plan data from backend changes
  useEffect(() => {
    setMonthlyPrice(plan.monthlyPrice || "");
    setAnnuallyPrice(plan.annuallyPrice || "");
    setDiscount(plan.discount || 0);
  }, [plan]);

  // Function to calculate the final price based on the discount
  const calculateFinalPrice = (price: number, discount: number): number => {
    return price - (price * discount) / 100;
  };

  // Calculate the final price dynamically
  const finalPrice = isMonthly
    ? calculateFinalPrice(Number(monthlyPrice) || 0, Number(discount) || 0)
    : calculateFinalPrice(Number(annuallyPrice) || 0, Number(discount) || 0);

  return (
    <div key={planType} className="space-y-2 my-4">
      <div className="flex items-center gap-2">
        <Switch checked={plan.isActive} />
        <div className="font-medium">{plan.name}</div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <Label>{isMonthly ? "Monthly Price:" : "Annual Price:"}</Label>
          <Input
            type="number"
            value={isMonthly ? monthlyPrice : annuallyPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (isMonthly) {
                setMonthlyPrice(value === "" ? "" : parseFloat(value));
              } else {
                setAnnuallyPrice(value === "" ? "" : parseFloat(value));
              }
            }}
          />
        </div>
        <div className="w-full">
          <Label>Discount:</Label>
          <Input
            type="number"
            value={discount}
            onChange={(e) => {
              const value = e.target.value;
              setDiscount(value === "" ? "" : parseFloat(value));
            }}
          />
        </div>
        <div className="w-full">
          <Label>Final Price:</Label>
          <Input value={finalPrice.toFixed(2)} readOnly disabled />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <Checkbox checked={plan.contactUs} />
        <Label>Contact Us</Label>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { useSubscriptionStore } from "../../store/subscriptionManagerStore";

// interface PlanProps {
//   planType: string;
//   plan: {
//     _id: string;
//     name: string;
//     monthlyPrice?: number;
//     annuallyPrice?: number;
//     discount: number;
//     isActive: boolean;
//     contactUs: boolean;
//   };
//   isMonthly: boolean;
// }

// export default function Plan({ planType, plan, isMonthly }: PlanProps) {
//   const updatePlanField = useSubscriptionStore(
//     (state) => state.updatePlanField
//   );

//   const [monthlyPrice, setMonthlyPrice] = useState<number | string>(
//     plan.monthlyPrice || ""
//   );
//   const [annuallyPrice, setAnnuallyPrice] = useState<number | string>(
//     plan.annuallyPrice || ""
//   );
//   const [discount, setDiscount] = useState<number | string>(plan.discount || 0);

//   useEffect(() => {
//     setMonthlyPrice(plan.monthlyPrice || "");
//     setAnnuallyPrice(plan.annuallyPrice || "");
//     setDiscount(plan.discount || 0);
//   }, [plan]);

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value === "" ? "" : parseFloat(e.target.value);
//     const updatedPrices = isMonthly
//       ? [{ ...plan.monthlyPrice, initialPrice: value }]
//       : [{ ...plan.annuallyPrice, initialPrice: value }];

//     if (isMonthly) {
//       setMonthlyPrice(value);
//       updatePlanField(plan._id, "monthlyPrice", updatedPrices);
//     } else {
//       setAnnuallyPrice(value);
//       updatePlanField(plan._id, "yearlyPrice", updatedPrices);
//     }
//   };

//   const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value === "" ? "" : parseFloat(e.target.value);
//     const updatedPrices = isMonthly
//       ? [{ ...plan.monthlyPrice, discount: value }]
//       : [{ ...plan.annuallyPrice, discount: value }];

//     setDiscount(value);
//     updatePlanField(
//       plan._id,
//       isMonthly ? "monthlyPrice" : "yearlyPrice",
//       updatedPrices
//     );
//   };

//   const finalPrice = (price: number, discount: number): number => {
//     return price - (price * discount) / 100;
//   };

//   return (
//     <div key={planType} className="space-y-2 my-4">
//       <div className="flex items-center gap-2">
//         <div className="font-medium">{plan.name}</div>
//       </div>
//       <div className="flex gap-4">
//         <div className="w-full">
//           <Label>{isMonthly ? "Monthly Price:" : "Annual Price:"}</Label>
//           <Input
//             type="number"
//             value={isMonthly ? monthlyPrice : annuallyPrice}
//             onChange={handlePriceChange}
//           />
//         </div>
//         <div className="w-full">
//           <Label>Discount:</Label>
//           <Input
//             type="number"
//             value={discount}
//             onChange={handleDiscountChange}
//           />
//         </div>
//         <div className="w-full">
//           <Label>Final Price:</Label>
//           <Input
//             value={finalPrice(
//               isMonthly ? Number(monthlyPrice) : Number(annuallyPrice),
//               Number(discount)
//             ).toFixed(2)}
//             readOnly
//           />
//         </div>
//       </div>
//       <div className="flex items-center gap-2 pt-1">
//         <Checkbox checked={plan.contactUs} />
//         <Label>Contact Us</Label>
//       </div>
//     </div>
//   );
// }
