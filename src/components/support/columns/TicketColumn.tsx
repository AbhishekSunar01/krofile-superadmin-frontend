import { Button } from "../../ui/button";
import { ColumnDefinition, SupportTicketData } from "../../../types/type";

export const TicketColumn: ColumnDefinition<SupportTicketData>[] = [
  {
    id: "id",
    header: "I.D.",
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
    id: "topic",
    header: "Topic",
    accessorKey: "topic",
    sortable: false,
    filterable: true,
    searchable: false,
  },
  {
    id: "subject",
    header: "Subject",
    accessorKey: "subject",
    sortable: false,
    filterable: true,
    searchable: false,
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
