import Plan from "./Plan";

interface PlanDetails {
  _id: string;
  title: string;
  isActive: boolean;
  yearlyPrice: Array<{
    initialPrice: string;
    discount: number;
    finalPrice: string;
    contactUs: boolean;
  }>;
}

interface AnnuallyPlanProps {
  plans: PlanDetails[];
}

export default function AnnuallyPlan({ plans }: AnnuallyPlanProps) {
  return (
    <div>
      {plans.map((plan) => (
        <Plan
          key={plan._id}
          planType={plan.title}
          plan={{
            name: plan.title,
            annuallyPrice: parseFloat(plan.yearlyPrice[0].initialPrice) * 12,
            discount: plan.yearlyPrice[0].discount,
            isActive: plan.isActive,
            contactUs: plan.yearlyPrice[0].contactUs,
          }}
          isMonthly={false}
        />
      ))}
    </div>
  );
}
