import { Bell } from "lucide-react";
import { Card } from "../ui/card";

export default function NotificationBell() {
  return (
    <Card className="text-destructive bg-mainBg p-2 shadow-sm">
      <Bell className="w-6 h-6 cursor-pointer" />
    </Card>
  );
}
