import { ColumnDef } from "@tanstack/react-table";
import UpArrow from "../../assets/uparrow.svg";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type userData = {
  id: string;
  sn: number;
  name: string;
  email: string;
  loginDetails: string;
  role: string;
  lastPasswordChange: string;
  twofa: boolean;
};

export const columns: ColumnDef<userData>[] = [
  {
    accessorKey: "sn",
    header: "S.N.",
  },
  {
    accessorKey: "name",
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    enableSorting: true,
    header: ({ column }) => {
      console.log(column);
      return (
        <button
          className="flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <div className="flex justify-center items-center flex-col">
            <img src={UpArrow} className="ml-2 h-2 w-2" />
            <img src={UpArrow} className="ml-2 h-2 w-2 rotate-180" />
          </div>
        </button>
      );
    },
  },
  {
    accessorKey: "email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    enableSorting: true,
    header: ({ column }) => {
      console.log(column);
      return (
        <button
          className="flex justify-center items-center"
          onClick={() => column.toggleSorting()}
        >
          Email
          <div className="flex justify-center items-center flex-col">
            <img src={UpArrow} className="ml-2 h-2 w-2" />
            <img src={UpArrow} className="ml-2 h-2 w-2 rotate-180" />
          </div>
        </button>
      );
    },
  },
  {
    accessorKey: "loginDetails",
    header: "Login Details",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "lastPasswordChange",
    header: "Last Password Change",
  },
  {
    accessorKey: "twofa",
    header: "2FA",
  },
];
