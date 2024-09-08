import NotificationForm from "./NotificationForm";
import { useNotificationType } from "../../store/notificationManagerStore";

export default function PushUpdate() {
  const { selectedValue } = useNotificationType();

  return (
    <div className="w-full">
      {selectedValue === "notificationform" && <NotificationForm />}
    </div>
  );
}
