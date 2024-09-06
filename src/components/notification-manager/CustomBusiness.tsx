import { useState } from "react";
import { useNotificationType } from "../../store/notificationManagerStore";
import { ChevronLeft } from "lucide-react";
import { Input } from "../ui/input";
import industryTypes from "../../json/dummyData/industryTypes.json";
import whitetick from "../../assets/svg/whitetick.svg";
import { Checkbox } from "../ui/checkbox";

type Business = {
  id: number;
  name: string;
};

type IndustryType = {
  id: number;
  type: string;
  business?: Business[];
};

export default function CustomBusiness() {
  const { setSelectedValue } = useNotificationType();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>(
    []
  );

  const filteredIndustryTypes = industryTypes.filter((industry: IndustryType) =>
    industry.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIndustryClick = (industry: IndustryType) => {
    setSelectedIndustries((prevSelected) => {
      if (prevSelected.some((selected) => selected.id === industry.id)) {
        return prevSelected.filter((selected) => selected.id !== industry.id);
      } else {
        return [...prevSelected, industry];
      }
    });
  };

  const selectedBusinesses = selectedIndustries.flatMap(
    (industry) => industry.business || []
  );

  return (
    <div className="flex flex-col py-2 gap-3">
      <div
        className="flex cursor-pointer items-center hover:font-semibold w-fit"
        onClick={() => setSelectedValue("notificationform")}
      >
        <ChevronLeft size={24} />
        Back
      </div>

      <h5 className="font-semibold">Custom Business</h5>

      <Input
        placeholder="Search"
        className="w-2/5 bg-mainBg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <h5 className="font-medium">Choose Industry</h5>
      </div>

      <div
        className={`flex flex-wrap w-full ${
          selectedBusinesses.length > 0 ? "h-[240px] overflow-hidden" : ""
        }`}
      >
        {filteredIndustryTypes.map((industry: IndustryType) => (
          <div
            key={industry.id}
            className={`p-2 rounded-lg w-2/4 cursor-pointer hover:bg-mainBg flex gap-2 items-center ${
              selectedIndustries.some((selected) => selected.id === industry.id)
                ? "bg-mainBg"
                : ""
            }`}
            onClick={() => handleIndustryClick(industry)}
          >
            {industry.type}{" "}
            {selectedIndustries.some(
              (selected) => selected.id === industry.id
            ) && (
              <div className="bg-accentDarkGreen w-fit rounded-full px-[0.5px]">
                <img src={whitetick} alt="tick" />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedBusinesses.length > 0 && (
        <div className="mt-4">
          <h5 className="font-medium mb-3">Selected Businesses</h5>
          <div className="flex flex-wrap w-full">
            {selectedBusinesses.map((business: Business) => (
              <div
                key={business.id}
                className="p-2 rounded-lg w-2/4 cursor-pointer hover:bg-mainBg flex items-center gap-2"
              >
                {/* {business.name} */}
                <Checkbox id={business.name} defaultChecked />
                <label htmlFor={business.name}>{business.name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
