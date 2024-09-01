import { usePlanStore } from "../../../app/store";
import { Checkbox } from "../../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

export default function ConfigurePlanTable() {
  const { plans } = usePlanStore();
  return (
    <div className="w-full">
      <Table className="w-full">
        <TableHeader className="h-[110px] border-b">
          <TableHead>S.N.</TableHead>
          <TableHead>Features</TableHead>
          <TableHead>Description</TableHead>
          {Object.keys(plans).map((planType) => {
            return <TableHead>{planType}</TableHead>;
          })}

          <TableHead>Actions</TableHead>
        </TableHeader>
        <TableBody className="py-4 mt-4">
          <TableRow className="">
            <TableCell className="flex gap-2 items-center">
              <div>
                <Checkbox />
              </div>
              <div>1</div>
            </TableCell>
            <TableCell>Unlimited Short Links</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>N/A</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
