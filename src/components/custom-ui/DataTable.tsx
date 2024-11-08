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
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FilterDropdown from "./Filter";
import Pagination from "../user-management/list-table/Pagination";

import search from "../../assets/svg/Search.svg";

import up from "../../assets/svg/up.svg";
import up1 from "../../assets/svg/active-up.svg";
import down1 from "../../assets/svg/active-down.svg";
import down from "../../assets/svg/down.svg";
import close from "../../assets/svg/close.svg";

import { Separator } from "../ui/separator";

import {
  BusinessData,
  ColumnDefinition,
  DataTableItem,
  DataTableProps,
  FilterOption,
} from "../../types/type";
import BusinessDetailsSheet from "../user-management/list-table/BusinessDetailsSheet";
import ViewBusiness from "../support/view-details/ViewBusiness";
import TicketDetails from "../support/view-details/ViewTicket";
import ViewSubscription from "../support/view-details/ViewSubscription";
import Download from "./Download";
import { cn } from "../../lib/utils";

export default function DataTable<T extends DataTableItem>({
  data,
  columns,
  title,
  detailViewType,
  showDownload,
  fileName,
}: DataTableProps<T>) {
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
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  const handleLocationClick = (email: string) => {
    setGlobalFilter(email);
    setIsSheetOpen(false);
  };

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
    switch (detailViewType) {
      case "sheet":
        setIsSheetOpen(true);
        break;
      case "dialog":
        setIsDialogOpen(true);
        break;
      case "ticket":
        setIsTicketOpen(true);
        break;
      case "subscription":
        setIsSubscriptionOpen(true);
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setSelectedRow(null);
    setIsSheetOpen(false);
    setIsDialogOpen(false);
    setIsTicketOpen(false);
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

  const handleRemoveAllFilters = () => {
    setActiveFilters({});
  };

  const tableColumns: ColumnDef<T>[] = [
    ...columns.map((col) => ({
      accessorKey: col.accessorKey,
      header: ({ column }: { column: any }) => {
        return col.sortable ? (
          <Button variant="ghost">
            {col.header}
            <span className="ml-2 flex flex-col items-center h-4 w-4 -mt-[4px] cursor-pointer">
              <img
                src={column.getIsSorted() === "asc" ? up1 : up}
                alt="Up"
                className={`cursor-pointer mb-[2px]`}
                onClick={() => column.toggleSorting(false)}
                style={{
                  pointerEvents:
                    column.getIsSorted() === "asc" ? "none" : "auto",
                }}
              />
              <img
                src={column.getIsSorted() === "desc" ? down1 : down}
                alt="Down"
                className={`cursor-pointer`}
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
        ? ({ row }: { row: any }) => col.cell!({ row })
        : ({ row }: { row: any }) => row.getValue(col.accessorKey),
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
    globalFilterFn: (row, _columnId, filterValue) => {
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
    <>
      {detailViewType === "ticket" && selectedRow ? (
        <TicketDetails
          data={selectedRow}
          onBack={handleBack}
          isOpen={isTicketOpen}
          onOpenChange={setIsTicketOpen}
          availableStatuses={uniqueStatuses}
        />
      ) : (
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
              <div>
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

              {showDownload && (
                <Download data={filteredData} fileName={fileName} />
              )}
            </div>
          </div>

          {activeFilters && (
            <div className="my-3">
              {Object.entries(activeFilters).map(
                ([filterLabel, selectedItems]) =>
                  selectedItems.length > 0 && (
                    <div
                      key={filterLabel}
                      className="flex gap-2 items-center justify-between text-sm font-normal text-[#F8F8F8]"
                    >
                      <div className="flex gap-2">
                        <span className=" flex items-center rounded-[12px] bg-accentGreen p-2 ">
                          {filterLabel}
                        </span>
                        <div className="flex flex-wrap gap-2 ">
                          {selectedItems.map((item, index) => (
                            <span
                              key={index}
                              className="bg-[#51A2E5] rounded-[12px] flex items-center justify-center px-2 cursor-pointer"
                              onClick={() =>
                                handleRemoveFilter(filterLabel, item)
                              }
                            >
                              {item}{" "}
                              <button className="ml-1 flex items-center text-white text-xl focus:outline-none cursor-pointer">
                                <img
                                  src={close}
                                  alt="close"
                                  className="h-5 w-5 -mt-[2px]"
                                />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className="bg-destructive rounded-[12px] flex items-center justify-center p-2 cursor-pointer min-w-[100px]"
                        onClick={handleRemoveAllFilters}
                      >
                        Clear All
                        <button className="ml-1 flex items-center text-white text-xl focus:outline-none cursor-pointer">
                          <img
                            src={close}
                            alt="close"
                            className="h-5 w-5 -mt-[2px]"
                          />
                        </button>
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
                    {headerGroup.headers.map((header, index) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "h-[80px] px-[16px]",
                          index === 0 ? "pl-8" : ""
                        )}
                        style={
                          header.id === "id" ? { textAlign: "center" } : {}
                        }
                      >
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
                        <TableCell
                          key={cell.id}
                          className={cn("h-[80px] px-[16px]")}
                        >
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

            {detailViewType === "sheet" && (
              <BusinessDetailsSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                businessData={selectedRow}
                onLocationClick={handleLocationClick}
              />
            )}

            {detailViewType === "dialog" && (
              <ViewBusiness
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                data={selectedRow}
                availableStatuses={uniqueStatuses}
              />
            )}

            {detailViewType === "subscription" && (
              <ViewSubscription
                isOpen={isSubscriptionOpen}
                onOpenChange={setIsSubscriptionOpen}
                data={selectedRow}
                availableStatuses={uniqueStatuses}
              />
            )}
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Pagination table={table} />
          </div>
        </div>
      )}
    </>
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
