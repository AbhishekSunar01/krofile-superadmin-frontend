// import { Button } from "../ui/button";
import { Card } from "../ui/card";
// import ConfigurePlanTable from "./subscriptionPlan/ConfigurePlanTable";
// import { useState } from "react";

export default function Configure() {
  // const [addNewData, setAddNewData] = useState(false); // Declare the 'addNewData' variable using the 'useState' hook

  // const handleAddNewData = () => {
  //   setAddNewData(true);
  // };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="font-medium">Configure Your Plan</div>
        <div className="muted">
          Adjust your subscription to meet your needs. Choose the features that
          work for you.
        </div>
        {/* {addNewData ? (
          <ConfigurePlanTable />
        ) : (
          )} */}
        <Card className="border-dashed border-2 w-full mt-2 py-8 flex flex-col items-center justify-center gap-4 min-h-[60vh]">
          <h4>Comming Soon</h4>
        </Card>
      </div>
    </div>
  );
}
