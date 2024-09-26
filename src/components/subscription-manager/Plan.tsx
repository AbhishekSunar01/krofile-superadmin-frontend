interface PlanProps {
  planType: string;
  plan: {
    name: string;
    monthlyPrice?: number;
    annuallyPrice?: number;
    discount: number;
    monthlyFinalPrice?: number;
    yearlyFinalPrice?: number;
    isActive: boolean;
  };
  isMonthly: boolean;
}

export default function Plan({ planType, plan, isMonthly }: PlanProps) {
  return (
    <div key={planType} className="space-y-2">
      <div className="font-medium">{plan.name}</div>
      <div>
        {isMonthly ? "Monthly Price:" : "Annual Price:"}{" "}
        {isMonthly ? plan.monthlyPrice : plan.annuallyPrice}
      </div>
      <div>
        Final Price:{" "}
        {isMonthly ? plan.monthlyFinalPrice : plan.yearlyFinalPrice}
      </div>
      <div>Discount: {plan.discount}%</div>
      <div>Active: {plan.isActive ? "Yes" : "No"}</div>
    </div>
  );
}
