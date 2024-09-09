import { useState } from "react";
import { Card } from "../components/ui/card";
import PageLayout from "../layout/PageLayout";
import VerticalTabs from "../components/custom-ui/VerticalTabs";
import {
  Notifications,
  PushUpdate,
} from "../components/notification-manager/index";
import { useNotificationType } from "../store/notificationManagerStore";
import CustomBusiness from "../components/notification-manager/CustomBusiness";
import { Button } from "../components/ui/button";

const TabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case "Push Update":
      return <PushUpdate />;
    case "Notifications":
      return <Notifications />;
    default:
      return null;
  }
};

export default function NotificationManager() {
  const [activeTab, setActiveTab] = useState("Push Update");
  const { selectedValue } = useNotificationType();
  const tabs = ["Push Update", "Notifications"];
  return (
    <PageLayout
      title="Notification Manager"
      description="Strengthen business relationships using the Notification Manager to send notifications and keep an organized history of all messages."
    >
      {selectedValue === "notificationform" ? (
        <Card className="p-8 transition-all delay-100 ease-linear">
          <h4 className="border-b pb-2 mb-2">{activeTab}</h4>

          <div className="flex mt-6 w-full gap-6">
            <VerticalTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabContent activeTab={activeTab} />
          </div>
        </Card>
      ) : (
        <Card className="p-8 transition-all delay-75 ease-linear">
          <h4 className="border-b pb-2 mb-2">Push Notifications</h4>
          <CustomBusiness />
          <div className="w-full flex justify-end">
            <Button variant={"disabled"} size={"lg"}>
              Send Notification
            </Button>
          </div>
        </Card>
      )}
    </PageLayout>
  );
}
