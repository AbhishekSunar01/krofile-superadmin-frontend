import { ColumnDef } from "@tanstack/react-table";
import { NotificationType } from "../../types/type";

export const columns: ColumnDef<NotificationType>[] = [
  {
    accessorKey: "sno",
    header: "S.No",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "business",
    header: "Business",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
  },
];
