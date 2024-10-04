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
