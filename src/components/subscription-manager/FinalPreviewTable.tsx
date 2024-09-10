import { usePlanStore } from "../../app/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function FinalPreviewTable() {
  const { plans } = usePlanStore();
  return (
    <div className="w-full">
      <Table className="w-[80%] mx-auto">
        <TableHeader className={`h-[110px] border-b`}>
          <TableHead></TableHead>
          {Object.keys(plans).map((planType, index) => {
            return (
              <TableHead
                className={`text-center relative text-black font-semibold text-base ${
                  index === 1 ? "bg-white rounded-t-2xl p-0 m-0" : ""
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 w-full bg-accentDarkGreen text-xs py-1 text-white rounded-t-xl">
                    Recommended
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  {planType}
                  <div
                    className={`w-[80%] py-1 mx-auto text-xs font-medium ${
                      index === 1 ? "bg-[#00a81c] text-white" : "bg-mainBg"
                    } rounded-sm`}
                  >
                    Try For Free
                  </div>
                </div>
              </TableHead>
            );
          })}
        </TableHeader>
        <TableBody className="py-4 mt-4">
          <TableRow className="">
            <TableCell className="flex gap-2 items-center">
              No of Users
            </TableCell>
            <TableCell className="text-center">Yes, 10</TableCell>
            <TableCell className="bg-white text-center">Yes, 10</TableCell>
            <TableCell className="text-center">Unlimited</TableCell>
            <TableCell className="text-center">Unlimited</TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="flex gap-2 items-center">
              Unlimited Short Links
            </TableCell>
            <TableCell className="text-center">N/A</TableCell>
            <TableCell className="bg-white text-center">Available</TableCell>
            <TableCell className="text-center">Available</TableCell>
            <TableCell className="text-center">Available</TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="flex gap-2 items-center">
              No of Users
            </TableCell>
            <TableCell className="text-center">N/A</TableCell>
            <TableCell className="bg-white text-center">Available</TableCell>
            <TableCell className="text-center">Available</TableCell>
            <TableCell className="text-center">Available</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
