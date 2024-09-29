// import Plan from "./Plan";

// interface PlanDetails {
//   _id: string;
//   title: string;
//   isActive: boolean;
//   yearlyPrice: Array<{
//     initialPrice: string;
//     discount: number;
//     finalPrice: string;
//     contactUs: boolean;
//   }>;
// }

// interface AnnuallyPlanProps {
//   plans: PlanDetails[];
// }

// export default function AnnuallyPlan({ plans }: AnnuallyPlanProps) {
//   return (
//     <div>
//       {plans.map((plan) => (
//         <Plan
//           key={plan._id}
//           planType={plan.title}
//           plan={{
//             name: plan.title,
//             annuallyPrice: parseFloat(plan.yearlyPrice[0].initialPrice) * 12,
//             discount: plan.yearlyPrice[0].discount,
//             isActive: plan.isActive,
//             contactUs: plan.yearlyPrice[0].contactUs,
//           }}
//           isMonthly={false}
//         />
//       ))}
//     </div>
//   );
// }

import React from "react";
import { PlanDetails } from "../../types/subscriptionManagementTypes";

interface AnnuallyPlanProps {
  plans: PlanDetails[];
}

const AnnuallyPlan: React.FC<AnnuallyPlanProps> = ({ plans }) => {
  return (
    <div>
      {plans.map((plan) => (
        <div key={plan._id} className="plan-card">
          <h2>{plan.title}</h2>
          <p>Active: {plan.isActive ? "Yes" : "No"}</p>
          <p>Contact Us: {plan.contactUs ? "Yes" : "No"}</p>
          <p>Recommended: {plan.recommended ? "Yes" : "No"}</p>
          <div>
            <h3>Yearly Prices:</h3>
            {plan.yearlyPrice.map((priceDetail, index) => (
              <div key={index}>
                <p>Initial Price: {priceDetail.initialPrice}</p>
                <p>Discount: {priceDetail.discount}%</p>
                <p>Final Price: {priceDetail.finalPrice}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnuallyPlan;
