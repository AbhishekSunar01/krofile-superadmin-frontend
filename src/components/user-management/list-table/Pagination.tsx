/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";

const Pagination = ({ table }: { table: any }) => {
  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(currentPage - 1, 0);
    let endPage = Math.min(currentPage + 1, totalPages - 1);

    if (currentPage === 0) {
      endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
    } else if (currentPage === totalPages - 1) {
      startPage = Math.max(totalPages - maxVisiblePages, 0);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 0) {
      pageNumbers.unshift("...");
    }
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="space-x-2 flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        {getPageNumbers().map((pageNumber, index) => (
          <Button
            key={index}
            variant={
              currentPage === pageNumber ? "paginationActive" : "pagination"
            }
            size="sm"
            onClick={() => {
              if (pageNumber !== "...") {
                table.setPageIndex(pageNumber);
              }
            }}
            disabled={pageNumber === "..." || pageNumber === currentPage}
          >
            {pageNumber === "..." ? "..." : pageNumber + 1}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.setPageIndex(totalPages - 1)}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-1 text-primary cursor-pointer"
        >
          Next <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
