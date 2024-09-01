export default function NavigationTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex gap-4 cursor-pointer">
      {[
        "Content Management",
        "Subscription Plan",
        "Configure",
        "Final Preview",
      ].map((tab) => (
        <div
          key={tab}
          className={`pb-3
          ${activeTab === tab ? "border-b-2 border-primary" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
