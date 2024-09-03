import { useState, useEffect } from "react";
import { usePlanStore } from "../app/store";

// const useDiscountManager = () => {
//   const { plans, setDiscount, calculateFinalPrice, loadPlansFromJSON } =
//     usePlanStore();

//   const [mainDiscount, setMainDiscount] = useState(0);
//   const [mainDiscountDisabled, setMainDiscountDisabled] = useState(false);
//   const [individualDiscountsDisabled, setIndividualDiscountsDisabled] =
//     useState(false);

//   useEffect(() => {
//     loadPlansFromJSON();
//   }, [loadPlansFromJSON]);

//   const handleMainDiscountChange = (discount: number) => {
//     setMainDiscount(discount);
//     setIndividualDiscountsDisabled(discount > 0);

//     Object.keys(plans).forEach((planType) => {
//       setDiscount(planType, discount);
//       calculateFinalPrice(planType);
//     });
//   };

//   const handleIndividualDiscountChange = (
//     planType: string,
//     discount: number
//   ) => {
//     if (discount > 0) {
//       setMainDiscountDisabled(true);
//       setIndividualDiscountsDisabled(false);
//     } else {
//       const otherDiscountsSet = Object.keys(plans).some(
//         (type) => type !== planType && plans[type].discount > 0
//       );
//       if (!otherDiscountsSet) {
//         setMainDiscountDisabled(false);
//         setIndividualDiscountsDisabled(false);
//       }
//     }
//     setDiscount(planType, discount);
//     calculateFinalPrice(planType);
//   };

//   return {
//     mainDiscount,
//     setMainDiscount: handleMainDiscountChange,
//     mainDiscountDisabled,
//     individualDiscountsDisabled,
//     handleIndividualDiscountChange,
//   };
// };

// export default useDiscountManager;

const useDiscountManager = () => {
  const { plans, setDiscount, calculateFinalPrice, loadPlansFromJSON } =
    usePlanStore();

  const [mainDiscount, setMainDiscount] = useState(0);
  const [mainDiscountDisabled, setMainDiscountDisabled] = useState(false);
  const [individualDiscountsDisabled, setIndividualDiscountsDisabled] =
    useState(false);

  useEffect(() => {
    loadPlansFromJSON();
  }, [loadPlansFromJSON]);

  const handleMainDiscountChange = (discount: number) => {
    setMainDiscount(discount);
    setIndividualDiscountsDisabled(discount > 0);

    Object.keys(plans).forEach((planType) => {
      setDiscount(planType, discount);
      calculateFinalPrice(planType);
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
    calculateFinalPrice(planType);
  };

  return {
    mainDiscount,
    setMainDiscount: handleMainDiscountChange,
    mainDiscountDisabled,
    individualDiscountsDisabled,
    handleIndividualDiscountChange,
  };
};

export default useDiscountManager;
