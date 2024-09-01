/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import FilterDropdown from "./Filter";
import Pagination from "./Pagination";

import search from "../../../assets/svg/search.svg";
import print from "../../../assets/svg/print.svg";
import download from "../../../assets/svg/download.svg";
import csv from "../../../assets/svg/csv.svg";
import excel from "../../../assets/svg/excel.svg";
import up from "../../../assets/svg/up.svg";
import down from "../../../assets/svg/down.svg";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { Separator } from "../../ui/separator";

import ViewDetails from "../../support/ViewDetails";

import {
  BusinessData,
  ColumnDefinition,
  DataTableItem,
  DataTableProps,
  FilterOption,
} from "../../../types/type";
import BusinessDetailsSheet from "./BusinessDetailsSheet";

export default function DataTable<T extends DataTableItem>({
  data,
  columns,
  title,
  detailViewType,
}: DataTableProps<T> & { detailViewType: "sheet" | "dialog" }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[];
  }>({});

  const handleFilterChange = (filters: { [key: string]: string[] }) => {
    setActiveFilters(filters);
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BusinessData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    data.forEach((item: any) => {
      if (item.status) {
        statuses.add(item.status);
      }
    });
    return Array.from(statuses);
  }, [data]);

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    if (detailViewType === "sheet") {
      setIsSheetOpen(true);
    } else {
      setIsDialogOpen(true);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (values.length === 0) return true;

        const normalizedKey = key.toLowerCase().replace(/\s+/g, "");

        const dataKeyMap: { [key: string]: string } = {
          "subs.status": "subStatus",
          industrytype: "industryType",
        };

        const dataKey = dataKeyMap[normalizedKey] || normalizedKey;
        const itemValue = String(item[dataKey as keyof T] || "").toLowerCase();

        const selectedValues = new Set(
          values.map((value) => value.toLowerCase())
        );

        return selectedValues.has(itemValue);
      });
    });
  }, [data, activeFilters]);

  const handleRemoveFilter = (filterLabel: string, item: string) => {
    setActiveFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      updatedFilters[filterLabel] = updatedFilters[filterLabel].filter(
        (selectedItem) => selectedItem !== item
      );

      if (updatedFilters[filterLabel].length === 0) {
        delete updatedFilters[filterLabel];
      }

      return updatedFilters;
    });
  };

  const tableColumns: ColumnDef<T>[] = [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
    },
    ...columns.map((col) => ({
      accessorKey: col.accessorKey,
      header: ({ column }: { column: any }) => {
        return col.sortable ? (
          <Button variant="ghost">
            {col.header}
            <span className="ml-2 flex flex-col items-center h-4 w-4 -mt-[4px] cursor-pointer">
              <img
                src={up}
                alt="Up"
                className={`cursor-pointer mb-[2px] ${
                  column.getIsSorted() === "asc"
                    ? "opacity-50 text-[#74B5EA]"
                    : "opacity-100"
                }`}
                onClick={() => column.toggleSorting(false)}
                style={{
                  pointerEvents:
                    column.getIsSorted() === "asc" ? "none" : "auto",
                }}
              />
              <img
                src={down}
                alt="Down"
                className={`cursor-pointer ${
                  column.getIsSorted() === "desc"
                    ? "opacity-50 text-[#74B5EA]"
                    : "opacity-100"
                }`}
                onClick={() => column.toggleSorting(true)}
                style={{
                  pointerEvents:
                    column.getIsSorted() === "desc" ? "none" : "auto",
                }}
              />
            </span>
          </Button>
        ) : (
          col.header
        );
      },
      cell: col.cell
        ? ({ row }) => col.cell!({ row })
        : ({ row }) => row.getValue(col.accessorKey),
    })),
  ];

  const table = useReactTable({
    data: filteredData,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const searchableColumns = columns.filter((col) => col.searchable);
      return searchableColumns.some((col) => {
        const cellValue = row.getValue(col.accessorKey.toString());
        return cellValue
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const fromRow = pageIndex * pageSize + 1;
  const toRow = Math.min(fromRow + pageSize - 1, totalRows);

  const filterOptions = useMemo(
    () => extractFilterOptions(data, columns),
    [data, columns]
  );

  return (
    <div className="w-full">
      {title && <h1 className="text-[22px] font-medium pb-4">{title}</h1>}
      <div className="flex flex-row justify-between items-center p-4 bg-white rounded-[8px]">
        <div className="relative">
          <img
            src={search}
            alt="search"
            className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500 z-40"
          />
          <Input
            placeholder="Search"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="min-w-[400px] pl-9"
          />
        </div>

        <div className="flex gap-3">
          <div className="">
            <span className="text-[14px] font-normal text-gray-500">
              {fromRow}-{toRow} of {totalRows}
            </span>
          </div>
          <Separator
            orientation="vertical"
            className=" border-gray-400 h-[24px] border-[1px]"
          />

          <FilterDropdown
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />

          <img
            src={print}
            alt="print"
            className="h-[24px] w-[24px] cursor-pointer"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={download}
                alt="download"
                className="h-[24px] w-[24px] cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[182px] gap-1 py-2 px-[2px] rounded-[6px] shadow-md flex-1"
              align="end"
            >
              <DropdownMenuItem className="font-normal text-[14px]">
                <img src={csv} alt="" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-normal text-[14px]">
                <img src={excel} alt="" className="p-2" /> Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {activeFilters && (
        <div className="my-3">
          {Object.entries(activeFilters).map(
            ([filterLabel, selectedItems]) =>
              selectedItems.length > 0 && (
                <div
                  key={filterLabel}
                  className="flex gap-4  text-sm font-normal text-[#F8F8F8]"
                >
                  <span className=" flex items-center rounded-[12px] bg-[#00A81C] p-2">
                    {filterLabel} :
                  </span>
                  <div className="flex flex-wrap gap-2 ">
                    {selectedItems.map((item, index) => (
                      <span
                        key={index}
                        className="bg-[#1A69AA] rounded-[12px] flex items-center p-2"
                      >
                        {item}{" "}
                        <button
                          className="ml-2 text-white text-xl focus:outline-none cursor-pointer"
                          onClick={() => handleRemoveFilter(filterLabel, item)}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}

      <div className="rounded-md border-0 bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {detailViewType === "sheet" ? (
          <BusinessDetailsSheet
            isOpen={isSheetOpen}
            onOpenChange={setIsSheetOpen}
            businessData={selectedRow}
          />
        ) : (
          <ViewDetails
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            data={selectedRow}
            availableStatuses={uniqueStatuses}
          />
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination table={table} />
      </div>
    </div>
  );
}

function extractFilterOptions<T extends DataTableItem>(
  data: T[],
  columns: ColumnDefinition<T>[]
): FilterOption[] {
  const filterOptions: FilterOption[] = [];

  columns.forEach((col) => {
    if (col.filterable) {
      const optionsSet = new Set<string>();
      data.forEach((item) => {
        const value = item[col.accessorKey] as string;
        if (value) {
          optionsSet.add(value);
        }
      });

      filterOptions.push({
        label: col.header,
        options: Array.from(optionsSet),
      });
    }
  });

  return filterOptions;
}
