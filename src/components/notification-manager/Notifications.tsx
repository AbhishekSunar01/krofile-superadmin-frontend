import { columns } from "./Columns";
import { DataTable } from "./DataTable";

const data = [
  {
    sno: 1,
    title: "New Notification",
    type: "Information",
    status: "Active",
    business: "Business Name",
    startDate: "2021-09-01",
    expirationDate: "2021-09-30",
  },
  {
    sno: 2,
    title: "New Notification",
    type: "Information",
    status: "Active",
    business: "Business Name",
    startDate: "2021-09-01",
    expirationDate: "2021-09-30",
  },
  {
    sno: 3,
    title: "New Notification",
    type: "Information",
    status: "Active",
    business: "Business Name",
    startDate: "2021-09-01",
    expirationDate: "2021-09-30",
  },
  {
    sno: 4,
    title: "New Notification",
    type: "Information",
    status: "Active",
    business: "Business Name",
    startDate: "2021-09-01",
    expirationDate: "2021-09-30",
  },
  {
    sno: 5,
    title: "New Notification",
    type: "Information",
    status: "Active",
    business: "Business Name",
    startDate: "2021-09-01",
    expirationDate: "2021-09-30",
  },
];

export default function Notifications() {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
