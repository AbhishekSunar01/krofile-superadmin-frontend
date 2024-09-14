import { ColumnDefinition, ActivityLog } from "../../types/type";

export const ActivityLogColumns: ColumnDefinition<ActivityLog>[] = [
  {
    id: "id",
    header: "S.N.",
    accessorKey: "_id",
    sortable: false,
    searchable: true,
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%]  items-center justify-center -ml-4">
          {String(row.getValue("_id")).padStart(2, "0")}
        </div>
      );
    },
    // cell: ({ row }) => String(row.getValue("_id")).padStart(2, "0"),
  },
  {
    id: "date",
    header: "Date",
    accessorKey: "date",
    sortable: false,
    searchable: true,
    cell: ({ row }) => (
      <span>
        {new Date(row.original.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}
      </span>
    ),
  },
  {
    id: "event",
    header: "Event",
    accessorKey: "event",
    sortable: false,
    filterable: false,
    searchable: true,
  },
  {
    id: "action",
    header: "Action",
    accessorKey: "action",
    sortable: false,
    filterable: true,
    searchable: true,
    cell: ({ row }) => {
      const status = row.getValue("action") as string;
      let colorClass = "";

      switch (status) {
        case "Update":
          colorClass = "text-accentOrange";
          break;
        case "Create":
          colorClass = "text-accentGreen";
          break;
        case "Delete":
          colorClass = "text-destructive";
          break;
        default:
          colorClass = "text-gray-500";
      }

      return <span className={colorClass}>{status}</span>;
    },
  },
  {
    id: "member",
    header: "Member",
    accessorKey: "member",
    sortable: false,
    filterable: false,
    searchable: true,
  },
  {
    id: "device",
    header: "Device",
    accessorKey: "device",
    sortable: false,
    filterable: false,
    searchable: true,
  },
];
