import { useNotificationType } from "../../store/notificationManagerStore";
import { ChevronLeft } from "lucide-react";
import { Input } from "../ui/input";

export default function CustomBusiness() {
  const { setSelectedValue } = useNotificationType();
  return (
    <div className="flex flex-col py-2 gap-3">
      <div
        className="flex cursor-pointer items-center"
        onClick={() => setSelectedValue("notificationform")}
      >
        <ChevronLeft size={24} />
        Back
      </div>

      <h5 className="font-semibold">Custom Business</h5>

      <Input placeholder="Search" className="w-2/5 bg-mainBg" />
    </div>
  );
}
