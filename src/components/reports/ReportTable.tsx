// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";

// interface ITableProps {
//   data: Record<string, any>[];
//   headings: string[];
//   dataKeys: string[];
//   dataPerPage: number;
//   paginationType: "withNumber" | "withoutNumber";
// }

// const ReportTable = ({
//   headings,
//   data,
//   dataKeys,
//   dataPerPage,
//   paginationType,
// }: ITableProps) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = dataPerPage; // Number of rows you want to display per page

//   // Calculate the total number of pages
//   const totalPages =
//     Math.ceil(data.length / rowsPerPage) === 0
//       ? 1
//       : Math.ceil(data.length / rowsPerPage);

//   // Calculate the data for the current page
//   let currentData = data.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Fill in the empty rows if currentData is less than rowsPerPage
//   if (currentData.length < rowsPerPage) {
//     const emptyRows = Array.from(
//       { length: rowsPerPage - currentData.length },
//       () => ({})
//     ); // Create empty objects to fill the table
//     currentData = [...currentData, ...emptyRows];
//   }

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="w-full">
//       <Table className="h-[300px] w-full">
//         <TableHeader>
//           <TableRow>
//             <TableHead>SL No</TableHead>
//             {headings.map((heading) => (
//               <TableHead key={heading}>{heading}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {currentData.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 {(currentPage - 1) * rowsPerPage + index + 1}
//               </TableCell>

//               {dataKeys.map((data, index) => (
//                 <TableCell key={index}>
//                   {item[data] !== undefined ? item[data] : "--"}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Pagination Controls without page number */}
//       {paginationType === "withoutNumber" && (
//         <div className="flex text-end justify-end items-center gap-4 pr-1 mt-2">
//           <div className="text-[12px] font-[400] font-inter">
//             {currentPage} of {totalPages}
//           </div>
//           <div className="flex gap-2">
//             {/* Previous Button */}
//             <div
//               className={`bg-[#F6F7F9] rounded-[4px] h-[30px] w-[30px] flex justify-center items-center ${
//                 currentPage === 1
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               onClick={handlePreviousPage}
//             >
//               <ChevronLeft color="#6F7C8E" className="h-[16px] w-[16px]" />
//             </div>
//             {/* Next Button */}
//             <div
//               className={`bg-[#F6F7F9] rounded-[4px] h-[30px] w-[30px] flex justify-center items-center ${
//                 currentPage === totalPages
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               onClick={handleNextPage}
//             >
//               <ChevronRight color="#6F7C8E" className="h-[16px] w-[16px]" />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Pagination Controls with page numbers */}
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex space-x-2 items-center justify-center">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => table.setPageIndex(currentPage - 1)}
//             disabled={!table.getCanPreviousPage()}
//             className="flex items-center gap-1 cursor-pointer"
//           >
//             <ChevronLeft size={16} />
//             Previous
//           </Button>

//           {getPageNumbers().map((pageNumber, index) => (
//             <div key={index}>
//               {" "}
//               <Button
//                 key={index}
//                 variant={
//                   currentPage === pageNumber ? "paginationActive" : "pagination"
//                 }
//                 size="sm"
//                 onClick={() => {
//                   if (pageNumber !== "...") {
//                     table.setPageIndex(pageNumber);
//                   }
//                 }}
//                 disabled={pageNumber === "..." || pageNumber === currentPage}
//               >
//                 {typeof pageNumber === "number" ? pageNumber + 1 : pageNumber}
//               </Button>
//             </div>
//           ))}

//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => table.setPageIndex(currentPage + 1)}
//             disabled={!table.getCanNextPage()}
//             className="flex items-center gap-1 text-primary cursor-pointer"
//           >
//             Next <ChevronRight size={16} />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportTable;

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ITableProps {
  data: Record<string, any>[];
  headings: string[];
  dataKeys: string[];
  dataPerPage: number;
  paginationType: "withNumber" | "withoutNumber";
}

const ReportTable = ({
  headings,
  data,
  dataKeys,
  dataPerPage,
  paginationType,
}: ITableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = dataPerPage;

  const totalPages =
    Math.ceil(data.length / rowsPerPage) === 0
      ? 1
      : Math.ceil(data.length / rowsPerPage);

  let currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (currentData.length < rowsPerPage) {
    const emptyRows = Array.from(
      { length: rowsPerPage - currentData.length },
      () => ({})
    );
    currentData = [...currentData, ...emptyRows];
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full">
      <Table className="h-[300px] w-full">
        <TableHeader>
          <TableRow>
            <TableHead>SL No</TableHead>
            {headings.map((heading) => (
              <TableHead key={heading}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {(currentPage - 1) * rowsPerPage + index + 1}
              </TableCell>
              {dataKeys.map((key, i) => (
                <TableCell key={i}>
                  {item[key] !== undefined ? item[key] : "--"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls without page numbers */}
      {paginationType === "withoutNumber" && (
        <div className="flex text-end justify-end items-center gap-4 pr-1 mt-2">
          <div className="text-[12px] font-[400] font-inter">
            {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <div
              className={`bg-[#F6F7F9] rounded-[4px] h-[30px] w-[30px] flex justify-center items-center ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handlePreviousPage}
            >
              <ChevronLeft color="#6F7C8E" className="h-[16px] w-[16px]" />
            </div>
            <div
              className={`bg-[#F6F7F9] rounded-[4px] h-[30px] w-[30px] flex justify-center items-center ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handleNextPage}
            >
              <ChevronRight color="#6F7C8E" className="h-[16px] w-[16px]" />
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls with page numbers */}
      {paginationType === "withNumber" && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousPage}
            // disabled={currentPage === 1}
            className={cn("flex items-center gap-1 select-none", {
              "cursor-not-allowed text-gray-500 hover:text-gray-500":
                currentPage === 1,
              "cursor-pointer": currentPage !== 1,
            })}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          {getPageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={
                currentPage === pageNumber + 1
                  ? "paginationActive"
                  : "pagination"
              }
              size="sm"
              className="select-none"
              onClick={() => setCurrentPage(pageNumber + 1)}
              disabled={currentPage === pageNumber + 1}
            >
              {pageNumber + 1}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            // disabled={currentPage === totalPages}
            className={cn(
              "flex items-center gap-1 text-primary cursor-pointer select-none",
              {
                "cursor-not-allowed text-gray-500 hover:text-gray-500":
                  currentPage === totalPages,
              }
            )}
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportTable;
