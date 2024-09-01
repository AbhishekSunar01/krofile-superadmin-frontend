import { Button } from "../ui/button";
import { ColumnDefinition } from "../user-management/list-table/DataTable";

export type SupportBusinessData = {
  _id: string;
  businessName: string;
  industryType: string;
  category: string;
  source: string;
  regDate: string;
  status: string;
};

export const SupportColumns: ColumnDefinition<SupportBusinessData>[] = [
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
    searchable: true,
  },
  {
    id: "source",
    header: "Source",
    accessorKey: "source",
    sortable: false,
    filterable: true,
    searchable: true,
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
    searchable: true,
  },
];
