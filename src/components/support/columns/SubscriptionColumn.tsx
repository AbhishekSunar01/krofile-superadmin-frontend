import { Button } from "../../ui/button";
import { ColumnDefinition, SupportSubscriptionData } from "../../../types/type";

export const SubscriptionColumn: ColumnDefinition<SupportSubscriptionData>[] = [
  {
    id: "id",
    header: "S.N.",
    accessorKey: "_id",
    sortable: false,
    searchable: true,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {String(row.getValue("_id")).padStart(2, "0")}
        </div>
      );
    },
    // cell: ({ row }) => String(row.getValue("_id")).padStart(2, "0"),
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sortable: true,
    searchable: true,
    cell: ({ row }) => <Button variant="ghost">{row.getValue("name")}</Button>,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    sortable: false,
    filterable: false,
    searchable: true,
  },

  {
    id: "date",
    header: "Date",
    accessorKey: "date",
    sortable: true,
    cell: ({ row }) => (
      <Button variant="ghost">
        {new Date(row.original.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}
      </Button>
    ),
  },
  {
    id: "businessName",
    header: "Business Name",
    accessorKey: "businessName",
    sortable: false,
    searchable: true,
  },

  {
    id: "country",
    header: "Country",
    accessorKey: "country",
    sortable: true,
    searchable: true,
    filterable: false,
    cell: ({ row }) => (
      <Button variant="ghost">{row.getValue("country")}</Button>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: false,
    filterable: true,
    searchable: false,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let colorClass = "";

      switch (status) {
        case "New Request":
          colorClass = "text-accentOrange";
          break;
        case "Under Review":
          colorClass = "text-primary";
          break;
        case "Completed":
          colorClass = "text-accentGreen";
          break;
        case "Rejected":
          colorClass = "text-destructive";
          break;
        case "Cancelled":
          colorClass = "text-destructive";
          break;
        default:
          colorClass = "text-gray-500";
      }

      return <span className={colorClass}>{status}</span>;
    },
  },
];
