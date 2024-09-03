import PageLayout from "../layout/PageLayout";
import SupportComponent from "../components/support/SupportComponent";

export default function Support() {
  return (
    <PageLayout
      title="Support"
      description="Effortlessly manage and respond to all customer interactions, including requests, feedback, support tickets, and notifications, from one central hub"
    >
      <SupportComponent />
    </PageLayout>
  );
}
