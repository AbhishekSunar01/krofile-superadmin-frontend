import Plan from "./Plan";

interface PlanDetails {
  _id: string;
  title: string;
  isActive: boolean;
  monthlyPrice: Array<{
    initialPrice: string;
    discount: number;
    finalPrice: string;
    contactUs: boolean;
  }>;
}

interface MonthlyPlanProps {
  plans: PlanDetails[];
}

export default function MonthlyPlan({ plans }: MonthlyPlanProps) {
  return (
    <div>
      {plans.map((plan) => (
        <Plan
          key={plan._id}
          planType={plan.title}
          plan={{
            name: plan.title,
            monthlyPrice: parseFloat(plan.monthlyPrice[0].initialPrice),
            discount: plan.monthlyPrice[0].discount,
            isActive: plan.isActive,
            contactUs: plan.monthlyPrice[0].contactUs,
          }}
          isMonthly={true}
        />
      ))}
    </div>
  );
}

// import Plan from "./Plan";

// interface PlanDetails {
//   _id: string;
//   title: string;
//   isActive: boolean;
//   monthlyPrice: Array<{
//     initialPrice: string;
//     discount: number;
//     finalPrice: string;
//     contactUs: boolean;
//   }>;
// }

// interface MonthlyPlanProps {
//   plans: PlanDetails[];
// }

// export default function MonthlyPlan({ plans }: MonthlyPlanProps) {
//   return (
//     <div>
//       {plans.map((plan) => (
//         <Plan
//           key={plan._id}
//           planType={plan.title}
//           plan={{
//             _id: plan._id,
//             name: plan.title,
//             monthlyPrice: parseFloat(plan.monthlyPrice[0].initialPrice),
//             discount: plan.monthlyPrice[0].discount,
//             isActive: plan.isActive,
//             contactUs: plan.monthlyPrice[0].contactUs,
//           }}
//           isMonthly={true}
//         />
//       ))}
//     </div>
//   );
// }
