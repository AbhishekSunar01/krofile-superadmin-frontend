import React, { useState, useEffect, useMemo } from "react";
import overViewData from "../../json/dummyData/overViewData.json";
import note from "../../assets/svg/note.svg";
import pull from "../../assets/svg/pull-request.svg";
import ticket from "../../assets/svg/ticket.svg";

interface OverViewItem {
  category: string;
  title: string;
  businessName: string;
  source: string;
  date: string;
  img: string;
}

const iconMap: Record<string, string> = {
  Feedback: note,
  Request: pull,
  Ticket: ticket,
};

const importLogo = async (iconName: string): Promise<string | null> => {
  try {
    const flag = await import(`../../assets/images/${iconName}.png`);
    return flag.default;
  } catch (error) {
    console.error(`Error loading Image for ${iconName}:`, error);
    return null;
  }
};

interface OverviewItemProps {
  item: OverViewItem;
}

const OverviewItem: React.FC<OverviewItemProps> = React.memo(({ item }) => {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const iconName = useMemo(
    () => item.businessName?.toLowerCase().replace(/\s+/g, ""),
    [item.businessName]
  );

  useEffect(() => {
    importLogo(iconName).then(setLogoSrc);
  }, [iconName]);

  const icon = iconMap[item.category] || note;

  return (
    <div className="flex flex-col items-start p-4 border-b border-gray-200">
      <div className="flex gap-1 items-center mb-3 text-sm">
        <img src={icon} alt="Icon" className="mr-2" />
        <h3 className="font-normal text-sm">{item.title}</h3>{" "}
        <span className="font-semibold text-sm">{item.businessName}</span>
      </div>
      <div className="flex text-sm gap-2 items-center ml-10 font-normal">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={`${item.img} logo`}
            className="rounded-full h-8 w-8 object-cover"
          />
        )}
        <div className="gap-2">
          {item.source} • {item.category} •
          <span className="text-gray-500 text-sm"> {item.date}</span>
        </div>
      </div>
    </div>
  );
});

const Overview: React.FC = () => {
  return (
    <div>
      {overViewData.map((item: OverViewItem, index: number) => (
        <OverviewItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Overview;
