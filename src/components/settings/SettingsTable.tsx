import TableHeading from "../tablecomponents/TableOptions";

import { columns, userData } from "./columns";
import { DataTableComponent } from "./DataTableComponent";

const SettingsTable = () => {
  const lastLoginDate = new Date(2024, 5, 27);

  const data: userData[] = [
    {
      id: "1",
      sn: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      loginDetails: "Last: 3 hours ago",
      role: "Admin",
      lastPasswordChange: lastLoginDate.toDateString(),
      twofa: true,
    },
    {
      id: "2",
      sn: 2,
      name: "Admin",
      email: "admin1@gmail.com",
      loginDetails: "Last: 2 days ago",
      role: "Suppport",
      lastPasswordChange: lastLoginDate.toDateString(),
      twofa: false,
    },
    {
      id: "3",
      sn: 3,
      name: "Admin",
      email: "admin2@gmail.com",
      loginDetails: "Last: 2 days ago",
      role: "Suppport",
      lastPasswordChange: lastLoginDate.toDateString(),
      twofa: false,
    },
    {
      id: "4",
      sn: 4,
      name: "Santosh",
      email: "santoshphaiju@gmail.com",
      loginDetails: "Last: 2 days ago",
      role: "Admin",
      lastPasswordChange: lastLoginDate.toDateString(),
      twofa: true,
    },
  ];

  return (
    <>
      <TableHeading />
      <div className="table border-none w-full">
        <DataTableComponent columns={columns} data={data} />
      </div>
    </>
  );
};

export default SettingsTable;
