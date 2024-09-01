import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SearchIcon from "../../assets/search.svg";
import csv from "../../assets/svg/csv.svg";
import excel from "../../assets/svg/excel.svg";

import { z } from "zod";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Printer,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  searchQuery: z.string(),
});

interface TableOptionProps<TData> {
  table: Table<TData>;
  fromRow: number;
  toRow: number;
  totalRows: number;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

function TableOptions<TData>({
  table,
  fromRow,
  toRow,
  totalRows,
  globalFilter,
  setGlobalFilter
}: TableOptionProps<TData>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <div className="flex tableHeading bg-white p-4 items-center justify-between rounded-[8px]">
        <div className="search">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2 items-center h-auto"
            >
              <FormField
                control={form.control}
                name="searchQuery"
                render={() => (
                  <FormItem className="relative">
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="w-[380px] !pl-[40px] px-[12px] bg-[#F6F7F9] text-[14px] text-[#525E6F]"
                        placeholder="Search"
                        // value={
                        //   (table
                        //     .getColumn("email")
                        //     ?.getFilterValue() as string) ?? ""
                        // }
                        // onChange={(event) =>
                        //   table
                        //     .getColumn("email")
                        //     ?.setFilterValue(event.target.value)
                        // }
                        value={globalFilter}
                        onChange={(event) =>
                          setGlobalFilter(event.target.value)
                        }
                        // {...field}
                      />
                    </FormControl>
                    <div className="searchIcon absolute -top-[2px] left-3">
                      <img src={SearchIcon} alt="serach icon here" />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex options justify-center items-center gap-[16px]">
          <div className="pagination text-[#6F7C8E] text-[14px] flex justify-center items-center gap-[14px] py-1 select-none">
            {fromRow} - {toRow} of {totalRows}
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft
                className={`h-[20px] w-[20px] ${
                  !table.getCanPreviousPage()
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              />{" "}
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight
                className={`h-[20px] w-[20px] ${
                  !table.getCanNextPage()
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              />
            </button>
          </div>
          <Separator
            orientation="vertical"
            className=" border-gray-400 h-[24px] border-[1px]"
          />
          <div className="flex dataOptions justify-center items-center gap-[18px] text-[#6e6e71]">
            <Filter className="h-[20px] w-[20px] cursor-pointer" />
            <Printer
              onClick={() => window.print()}
              className="h-[20px] w-[20px] cursor-pointer"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Download className="h-[20px] w-[20px] cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[182px] gap-1 rounded-[8px] shadow-md flex-1"
                align="end"
              >
                <DropdownMenuItem className="font-normal text-[14px] flex justify-start items-center gap-1 p-0 hover:bg-gray-100">
                  <img className="w-[40px] h-[40px]" src={csv} alt="" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-normal text-[14px] flex justify-start items-center gap-1 py-0 px-0 hover:bg-gray-100">
                  <div className="w-[40px] h-[40px] p-2">
                    <img src={excel} alt="" className="w-full h-full" />{" "}
                  </div>
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableOptions;
