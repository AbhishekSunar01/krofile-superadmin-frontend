import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import print from "../../assets/svg/print.svg";
import download from "../../assets/svg/download.svg";
import csv from "../../assets/svg/csv.svg";
import excel from "../../assets/svg/excel.svg";
import * as XLSX from "xlsx";

const exportToCSV = (data: any, fileName: string) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `${fileName}.csv`);
  a.click();
};

const exportToExcel = (data: any, fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default function Download({
  data,
  fileName,
}: {
  data: any;
  fileName: string | null;
}) {
  const handleCSVDownload = () => {
    exportToCSV(data, fileName || "data");
  };

  const handleExcelDownload = () => {
    exportToExcel(data, fileName || "data");
  };

  return (
    <div className="flex gap-3">
      <img
        src={print}
        alt="print"
        className="h-[24px] w-[24px] cursor-pointer"
        onClick={() => window.print()}
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
          <DropdownMenuItem
            className="font-normal text-[14px] flex items-center gap-2"
            onClick={handleCSVDownload}
          >
            <img src={csv} alt="csv" /> Export as CSV
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="font-normal text-[14px] flex items-center gap-2"
            onClick={handleExcelDownload}
          >
            <img src={excel} alt="excel" className="p-2" /> Export as Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
