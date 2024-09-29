import React, { useEffect } from "react";
import {
  PlanDetails,
  PriceDetails,
} from "../../types/subscriptionManagementTypes";
import { useSubscriptionPlanStore } from "../../store/subscriptionManagerStore";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { usePostMonethlySubscriptionPlan } from "../../services/mutations/subscriptionMutation";

interface MonthlyPlanProps {
  plans: PlanDetails[];
}

const MonthlyPlan: React.FC<MonthlyPlanProps> = ({ plans }) => {
  const updatePriceDetails = useSubscriptionPlanStore(
    (state) => state.updatePriceDetails
  );
  const postMonthlySubscriptionPlan = usePostMonethlySubscriptionPlan();

  const handlePriceChange = (
    planId: string,
    index: number,
    field: keyof PriceDetails,
    value: string | number
  ) => {
    const updatedPlans = plans.map((plan) => {
      if (plan._id === planId) {
        const updatedMonthlyPrice = plan.monthlyPrice.map((priceDetail, i) => {
          if (i === index) {
            return { ...priceDetail, [field]: value };
          }
          return priceDetail;
        });
        return { ...plan, monthlyPrice: updatedMonthlyPrice };
      }
      return plan;
    });
    updatePriceDetails(
      planId,
      "monthlyPrice",
      updatedPlans.find((plan) => plan._id === planId)?.monthlyPrice || []
    );
  };

  const logStateData = () => {
    const updates = plans.map((plan) => ({
      planId: plan._id,
      initialPrice: plan.monthlyPrice[0]?.initialPrice || 0,
      discount: plan.monthlyPrice[0]?.discount || 0,
      contactUs: plan.contactUs,
      isActive: plan.isActive,
    }));

    const stateData = {
      globalDiscount: 0,
      updates,
    };

    postMonthlySubscriptionPlan.mutate(stateData);

    console.log(JSON.stringify(stateData, null, 2));
  };

  // useEffect(() => {
  //   logStateData();
  // }, [plans]);

  return (
    <div>
      <button onClick={logStateData}>log</button>
      {plans.map((plan) => (
        <div key={plan._id} className="plan-card">
          <div className="flex items-center gap-2">
            <Switch />
            <h4>{plan.title}</h4>
          </div>
          {/* <p>Active: {plan.isActive ? "Yes" : "No"}</p>
          <p>Contact Us: {plan.contactUs ? "Yes" : "No"}</p> */}
          <div className="mb-4 pt-2">
            {plan.monthlyPrice.map((priceDetail, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-full">
                  <Label>Monthly Prices:</Label>
                  <Input
                    type="number"
                    value={priceDetail.initialPrice}
                    className="w-full"
                    onChange={(e) =>
                      handlePriceChange(
                        plan._id,
                        index,
                        "initialPrice",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="w-full">
                  <Label className="w-full">Discount:</Label>
                  <Input
                    type="number"
                    value={priceDetail.discount}
                    className="w-full"
                    onChange={(e) =>
                      handlePriceChange(
                        plan._id,
                        index,
                        "discount",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="w-full">
                  <Label className="w-full">Final Price:</Label>
                  <Input
                    type="text"
                    value={priceDetail.finalPrice}
                    className="w-full"
                    disabled
                    onChange={(e) =>
                      handlePriceChange(
                        plan._id,
                        index,
                        "finalPrice",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyPlan;
