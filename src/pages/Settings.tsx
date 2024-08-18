import { Button } from "../components/ui/button";
import PageLayout from "../layout/PageLayout";

export default function Settings() {
  return (
    <PageLayout
      title="Settings"
      description="Effortlessly manage your super admin team. Invite support members to oversee the panel, track business progress, and access detailed insights for smooth operations."
    >
      <div className="flex pageHeading justify-between items-center">
        <div className="text-[22px] font-[500] font-inter">
          Team Directory: Krofile Super Admin Members
        </div>

        <Button
          variant={"default"}
          className="px-[32px] text-[16px] rounded-[12px] h-[48px]"
        >
          Add User
        </Button>
      </div>
    </PageLayout>
  );
}
