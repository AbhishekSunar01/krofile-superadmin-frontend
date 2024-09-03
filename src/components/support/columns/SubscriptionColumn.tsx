import { Button } from "../../ui/button";
import { ColumnDefinition, SupportBusinessData } from "../../../types/type";

export const SubscriptionColumn: ColumnDefinition<SupportBusinessData>[] = [
  {
    id: "id",
    header: "S.N.",
    accessorKey: "_id",
    sortable: false,
    searchable: true,
    cell: ({ row }) => String(row.getValue("_id")).padStart(2, "0"),
  },
  {
    id: "businessName",
    header: "Business Name",
    accessorKey: "businessName",
    sortable: true,
    searchable: true,
    cell: ({ row }) => (
      <Button variant="ghost">{row.getValue("businessName")}</Button>
    ),
  },
  {
    id: "industryType",
    header: "Industry Type",
    accessorKey: "industryType",
    sortable: true,
    filterable: false,
    searchable: false,
    cell: ({ row }) => (
      <Button variant="ghost">{row.getValue("industryType")}</Button>
    ),
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
    sortable: false,
    filterable: true,
    searchable: false,
  },
  {
    id: "source",
    header: "Source",
    accessorKey: "source",
    sortable: false,
    filterable: true,
    searchable: false,
  },
  {
    id: "regDate",
    header: "Date",
    accessorKey: "regDate",
    sortable: true,
    cell: ({ row }) => (
      <Button variant="ghost">
        {new Date(row.original.regDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}
      </Button>
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
        case "Pending":
          colorClass = "text-orange-500";
          break;
        case "In Progress":
          colorClass = "text-blue-500";
          break;
        case "Completed":
          colorClass = "text-green-500";
          break;
        case "Rejected":
          colorClass = "text-red-500";
          break;
        default:
          colorClass = "text-gray-500";
      }

      return <span className={colorClass}>{status}</span>;
    },
  },
];
