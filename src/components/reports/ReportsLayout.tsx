import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronDown,
  ChevronLeft,
  CloudUpload,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import csv from "../../assets/svg/csv.svg";
import excel from "../../assets/svg/excel.svg";
import PageLayout from "../../layout/PageLayout";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface IReportsLayoutProps {
  children: React.ReactNode;
  activePage: string;
}

const ReportsLayout = ({ children, activePage }: IReportsLayoutProps) => {
  const nav = useNavigate();
  const [date, setDate] = useState<Date>();
  return (
    <>
      <PageLayout title="Reports" description="">
        <Card className="shadow-none">
          <CardHeader>
            <Link className="flex items-center gap-1 mb-3" to={"/reports"}>
              <ChevronLeft />
              <span className="text-[#525E6F]">Back</span>
            </Link>
            <div className="flex justify-between items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-[#14181F] text-[20px] font-[600]">
                  <div>{activePage}</div>
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      return nav("/reports/active-users-growth");
                    }}
                  >
                    <div>Active Users Growth Chart</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      return nav("/reports/active-users");
                    }}
                  >
                    <div>Active Users</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex justify-center items-center gap-3 text-[14px]">
                <Button variant={"outline"}>
                  <span>Last 30 Days</span>
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex items-center gap-2",
                        !date && "text-[#14181f]"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Custom Date</span>}
                      <CalendarIcon className="h-[16px] w-[16px]" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button variant={"outline"}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex justify-center items-center gap-2">
                        <span>Export</span>
                        <CloudUpload />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[182px] gap-1 mt-3 rounded-[8px] shadow-md flex-1"
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
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </PageLayout>
    </>
  );
};

export default ReportsLayout;
