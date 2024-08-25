import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form"; // Import the 'useForm' hook
import ConfigurePlanTable from "./subscriptionPlan/ConfigurePlanTable";
import { useState } from "react";

export default function Configure() {
  const [addNewData, setAddNewData] = useState(false); // Declare the 'addNewData' variable using the 'useState' hook
  const form = useForm(); // Declare the 'form' variable using the 'useForm' hook

  const handleAddNewData = () => {
    setAddNewData(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="font-medium">Grow with Referrals & Free Trials</div>
        <div className="muted">
          Earn rewards by referring new users and offer extended trial periods
          to help them explore Krofile.
        </div>
      </div>
      <div>
        <Form {...form}>
          <form className="w-full flex gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Referral Bonus Days</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the referral days" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Trial Period</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the free trial period"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div>
        <div className="font-medium">Configure Your Plan</div>
        <div className="muted">
          Adjust your subscription to meet your needs. Choose the features that
          work for you.
        </div>
        {addNewData ? (
          <ConfigurePlanTable />
        ) : (
          <Card className="border-dashed border-2 w-full mt-2 py-8 flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M26.5437 4.00846C26.343 4.00257 26.1432 4.03702 25.9561 4.10976C25.769 4.1825 25.5984 4.29205 25.4544 4.43193C25.3105 4.57181 25.196 4.73917 25.1179 4.92408C25.0398 5.109 24.9996 5.30772 24.9997 5.50846V21.5005C24.9997 22.3285 25.6717 23.0005 26.4997 23.0005H42.4917C42.6924 23.0005 42.8911 22.9603 43.076 22.8822C43.2609 22.8041 43.4283 22.6897 43.5682 22.5457C43.7081 22.4017 43.8176 22.2311 43.8904 22.044C43.9631 21.8569 43.9975 21.6571 43.9917 21.4565C43.8531 16.8728 41.9704 12.5149 38.7278 9.27232C35.4852 6.02973 31.1273 4.14699 26.5437 4.00846ZM27.9997 20.0005V7.13246C31.2579 7.57177 34.2817 9.06884 36.6065 11.3936C38.9313 13.7184 40.4283 16.7422 40.8677 20.0005H27.9997ZM21.9997 9.56846C21.9997 9.36018 21.9563 9.15418 21.8723 8.96359C21.7883 8.77299 21.6655 8.60198 21.5118 8.46144C21.3581 8.32089 21.1768 8.2139 20.9795 8.14728C20.7821 8.08065 20.5731 8.05585 20.3657 8.07446C16.959 8.38506 13.7114 9.65997 11.0032 11.7498C8.295 13.8397 6.23841 16.658 5.07431 19.8747C3.91021 23.0913 3.6868 26.5731 4.43024 29.9121C5.17369 33.2511 6.85321 36.3092 9.27208 38.728C11.6909 41.1469 14.749 42.8264 18.088 43.5699C21.4271 44.3133 24.9088 44.0899 28.1254 42.9258C31.3421 41.7617 34.1604 39.7051 36.2503 36.9969C38.3401 34.2887 39.6151 31.0411 39.9257 27.6345C39.9443 27.427 39.9195 27.218 39.8528 27.0206C39.7862 26.8233 39.6792 26.642 39.5387 26.4883C39.3981 26.3346 39.2271 26.2118 39.0365 26.1278C38.8459 26.0438 38.6399 26.0005 38.4317 26.0005H21.9997V9.56846ZM6.99965 26.0005C6.99895 22.5425 8.193 19.1905 10.3797 16.5117C12.5665 13.833 15.6116 11.9921 18.9997 11.3005V27.5005C18.9997 28.3285 19.6717 29.0005 20.4997 29.0005H36.6997C35.9594 32.6459 33.8911 35.8863 30.8961 38.0925C27.9011 40.2987 24.1932 41.3134 20.4922 40.9396C16.7911 40.5658 13.361 38.8301 10.8678 36.0695C8.3745 33.3089 6.99591 29.7203 6.99965 26.0005Z"
                fill="black"
              />
            </svg>

            <div className="flex flex-col items-center">
              <span className="text-lg">Data is empty</span>
              <span className="muted">Data is empty</span>
            </div>

            <Button variant={"outline"} onClick={handleAddNewData}>
              Add New Data
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
