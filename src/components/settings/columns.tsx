/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";

import UpArrow from "../../assets/uparrow.svg";

import { useState } from "react";
import { Switch } from "../ui/switch";
import { ActionComponent } from "./ActionComponent";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type userData = {
  id: string;
  sn: string;
  name: string;
  email: string;
  loginDetails: string;
  role: string;
  lastPasswordChange: string;
  twofa: boolean;
};

export const Columns: ColumnDef<userData>[] = [
  {
    accessorKey: "sn",
    header: "S.N.",
  },
  {
    accessorKey: "name",
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    enableSorting: true,
    header: ({ column }) => {
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
    cell: ({ row }) => {
      const [twofa, setTwofa] = useState<boolean>(row.original.twofa);

      const handleToggle = () => {
        setTwofa(!twofa);
        console.log("hello");
        // Optionally update the main data source or trigger an API call here
      };

      return (
        <div>
          <Switch checked={twofa} id="twofa" onCheckedChange={handleToggle} />
        </div>
      );
    },

    // cell: ({ row }) => (
    //   <div>
    //     <Switch checked={row.original.twofa} id="twofa" />
    //   </div>
    // ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionComponent row={row} />,
    accessorKey: "actions",
  },
];
