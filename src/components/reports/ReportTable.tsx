// import { ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { useState } from "react";

// interface ITableProps {
//   data: Record<string, any>[];
//   headings: string[];
// }

// const ReportTable = ({ headings, data }: ITableProps) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5; // Number of rows you want to display per page

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   // Calculate the data for the current page
//   const currentData = data.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

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
//         {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
//         <TableHeader>
//           <TableRow>
//             {headings.map((heading) => {
//               return <TableHead key={heading}>{heading}</TableHead>;
//             })}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item._id}</TableCell>
//               <TableCell>{item.businessName}</TableCell>
//               <TableCell>{item.date}</TableCell>
//               <TableCell>{item.plan}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       {/* Pagination Controls */}
//       <div className="flex text-end justify-end items-center gap-4 pr-1 mt-2">
//         <div className="text-[12px] font-[400] font-inter">
//           {currentPage} of {totalPages}
//         </div>
//         <div className="flex gap-2">
//           {/* Previous Button */}
//           <div
//             className={`bg-[#F6F7F9] rounded-[4px] h-[30px] w-[30px] flex justify-center items-center ${
//               currentPage === 1
//                 ? "opacity-50 cursor-not-allowed"
//                 : "cursor-pointer"
//             }`}
//             onClick={handlePreviousPage}
//           >
//             <ChevronLeft color="#6F7C8E" className="h-[16px] w-[16px]" />
//           </div>
//           {/* Next Button */}
//           <div
//             className={`bg-[#F6F7F9] rounded-[4px] h-[30px] w-[30px] flex justify-center items-center ${
//               currentPage === totalPages
//                 ? "opacity-50 cursor-not-allowed"
//                 : "cursor-pointer"
//             }`}
//             onClick={handleNextPage}
//           >
//             <ChevronRight color="#6F7C8E" className="h-[16px] w-[16px]" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportTable;


import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
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
}

const ReportTable = ({ headings, data, dataKeys }: ITableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows you want to display per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Calculate the data for the current page
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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

  return (
    <div className="w-full">
      <Table className="h-[300px] w-full">
        <TableHeader>
          <TableRow>
            {headings.map((heading) => (
              <TableHead key={heading}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {currentData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item._id}</TableCell>
              <TableCell>{item.businessName}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.plan}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
        <TableBody>
          {currentData.map((item, index) => (
            <TableRow key={index}>
              {dataKeys.map((data, index) => (
                <TableCell key={index}>
                  {/* Dynamically display the value based on the heading. If it doesn't exist in the item, show a default value */}
                  {item[data] !== undefined ? item[data] : "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex text-end justify-end items-center gap-4 pr-1 mt-2">
        <div className="text-[12px] font-[400] font-inter">
          {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          {/* Previous Button */}
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
          {/* Next Button */}
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
    </div>
  );
};

export default ReportTable;
