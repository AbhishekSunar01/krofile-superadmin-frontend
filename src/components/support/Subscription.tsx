import data from "../../json/dummyData/supportSubscription.json";
import { DataTable } from "../user-management";
import { SubscriptionColumn } from "./columns/SubscriptionColumn";

export default function Subscription() {
  return (
    <div>
      <DataTable
        columns={SubscriptionColumn}
        data={data}
        title=""
        detailViewType="subscription"
      />
    </div>
  );
}
