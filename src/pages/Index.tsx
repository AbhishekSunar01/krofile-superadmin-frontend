import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import PageLayout from "../layout/PageLayout";

export default function Index() {
  return (
    <PageLayout
      header="Subscription Management"
      description="Easily manage and update subscription content, create, modify, and delete plans and features, and offer discounts and referral bonuses to users."
    >
      <div>
        <Card className="p-4 h-[800px]">
          <Button>Click Me</Button>
        </Card>
      </div>
    </PageLayout>
  );
}
