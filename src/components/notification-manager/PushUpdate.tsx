import NotificationForm from "./NotificationForm";
import { useNotificationType } from "../../store/notificationManagerStore";
import { Button } from "../ui/button";

export default function PushUpdate() {
  const { selectedValue } = useNotificationType();

  return (
    <div className="w-full">
      {selectedValue === "notificationform" ? (
        <NotificationForm />
      ) : (
        <div>Hello</div>
      )}

      <div className="w-full flex justify-end mt-4">
        <Button variant={"disabled"} size={"lg"}>
          Send Notification
        </Button>
      </div>
    </div>
  );
}
