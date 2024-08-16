import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import PageLayout from "../layout/PageLayout";

export default function Dashboard() {
  return (
    <PageLayout
      title="Dashboard"
      description="Easily manage business changes with comprehensive performance metrics and detailed tracking of all upgrades and downgrades."
    >
      <Card className="w-full h-[900px] p-8">
        <Button>Click Me</Button>
      </Card>
    </PageLayout>
  );
}
