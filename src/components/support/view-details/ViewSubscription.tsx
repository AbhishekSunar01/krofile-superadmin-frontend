import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { ViewBusinessProps } from "../../../types/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";
import { Button } from "../../ui/button";

const ViewSubscription: React.FC<ViewBusinessProps> = ({
  data,
  isOpen,
  onOpenChange,
  availableStatuses,
}) => {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 min-w-[600px]" variant={"cross"}>
        <DialogHeader>
          <DialogTitle>
            <h1 className=" text-base font-semibold text-primary">
              New Request
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {data && (
            <div className="font-medium text-sm space-y-1">
              <div>
                Name: <span className="font-normal">{data.name || "N/A"}</span>
              </div>
              <div>
                Email:{" "}
                <span className="font-normal">{data.email || "N/A"}</span>
              </div>
              <div>
                Date: <span className="font-normal">{data.date || "N/A"}</span>
              </div>
              <div>
                Business Name:{" "}
                <span className="font-normal">
                  {data.businessName || "N/A"}
                </span>
              </div>
              <div>
                Country:{" "}
                <span className="font-normal">{data.country || "N/A"}</span>
              </div>
              <div>
                Contact Number:{" "}
                <span className="font-normal">
                  {data.contactNumber || "N/A"}
                </span>
              </div>
              <div>
                Locations:{" "}
                <span className="font-normal">{data.location || "N/A"}</span>
              </div>
              <div className="pt-3">
                Additional Notes:{" "}
                <span className="font-normal text-justify">
                  {data.note || "--"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className=" text-sm flex flex-col">
          <span className=" font-medium pb-1">Status</span>
          <Select>
            <SelectTrigger>{data.status || "Select a Status"}</SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex gap-3 mt-2">
          <Button variant={"outline1"} className="w-full">
            Reply Via Email
          </Button>
          <Button variant={"paginationActive"} className="w-full rounded-md">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubscription;
