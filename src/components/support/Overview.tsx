import overViewData from "../../json/dummyData/overViewData.json";
import note from "../../assets/svg/note.svg";
import pull from "../../assets/svg/pull-request.svg";
import ticket from "../../assets/svg/ticket.svg";
import React from "react";

export default function Overview() {
  const importLogo = async (iconName: string) => {
    try {
      const flag = await import(`../../assets/images/${iconName}.png`);
      return flag.default;
    } catch (error) {
      console.error(`Error loading flag for ${iconName}:`, error);
      return null;
    }
  };

  return (
    <div>
      {overViewData.map((item, index) => {
        let icon = "";

        switch (item.category) {
          case "Feedback":
            icon = note;
            break;
          case "Request":
            icon = pull;
            break;
          case "Ticket":
            icon = ticket;
            break;
          default:
            icon = note;
        }

        const iconName = item.businessName?.toLowerCase().replace(/\s+/g, "");

        const [logoSrc, setLogoSrc] = React.useState<string | null>(null);
        React.useEffect(() => {
          importLogo(iconName).then(setLogoSrc);
        }, [iconName]);

        return (
          <div
            key={index}
            className="flex flex-col items-start p-4 border-b border-gray-200"
          >
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
      })}
    </div>
  );
}
