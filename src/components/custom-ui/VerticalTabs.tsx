export default function VerticalTabs({
  activeTab,
  setActiveTab,
  tabs,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  tabs: string[];
}) {
  return (
    <div className="flex flex-col">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`pb-3 cursor-pointer py-2 px-3 w-[200px] transition-all delay-75 ease-linear
            ${activeTab === tab ? "bg-mainBg font-medium" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
