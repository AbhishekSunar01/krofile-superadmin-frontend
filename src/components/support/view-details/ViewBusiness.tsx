import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import logo from "../../../assets/images/logo.jpg";
import { ViewBusinessProps } from "../../../types/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";
import { Button } from "../../ui/button";

const ViewBusiness: React.FC<ViewBusinessProps> = ({
  data,
  isOpen,
  onOpenChange,
  availableStatuses,
}) => {
  if (!data) return null;

  const handleReply = () => {
    const subject = encodeURIComponent("Reply regarding " + data?.businessName);
    const body = encodeURIComponent(`Hello ${data?.customerName},\n\n`);
    const email = data?.customerEmail || "";

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${subject}&body=${body}`;

    const openMailApp = window.open(mailtoLink, "_self");

    setTimeout(() => {
      if (
        !openMailApp ||
        openMailApp.closed ||
        typeof openMailApp.closed === "undefined"
      ) {
        window.open(gmailLink, "_blank");
      }
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 min-w-[400px]" variant={"cross"}>
        <DialogHeader>
          <DialogTitle>
            <img src={logo} alt="Logo" className="h-[48px] w-[48px]" />
          </DialogTitle>
        </DialogHeader>
        <div className="gap-4">
          <div className="gap-2">
            <h1 className="text-lg font-medium">{data?.businessName}</h1>
            <span className="text-sm font-normal">
              {data?.industryType} • {data?.category} • {data?.source}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm ">
          <span className=" font-medium">
            Name: <span className=" font-normal">{data?.customerName}</span>
          </span>
          {data.category === "Request" && (
            <span className="font-medium">
              Reference:{" "}
              {data.reference ? (
                <span className="font-normal">{data?.reference}</span>
              ) : (
                <span>--</span>
              )}
            </span>
          )}
          <span className="font-medium">
            Additional Notes: <span className="font-normal">{data?.note}</span>
          </span>
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
          <Button variant={"outline1"} className="w-full" onClick={handleReply}>
            Reply Via Email
          </Button>
          <Button
            variant={"paginationActive"}
            className="w-full rounded-md"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBusiness;
