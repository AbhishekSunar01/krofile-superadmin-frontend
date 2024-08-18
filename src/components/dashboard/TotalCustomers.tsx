import { Users } from "lucide-react";
import data from "../../json/dummyData/totalCustomer.json";
import { Card } from "../../components/ui/card";

const colors = ["#90CAF9", "#A5D6A7", "#FFCC80", "#CE93D8"];

export default function TotalCustomers() {
  return (
    <Card className="flex flex-col items-start justify-between p-5 gap-4 h-fit shadow w-full">
      <div>
        <div className="text-xl font-semibold mb-2">Total Customers</div>
        <div className="text-xs font-normal">Customer’s Summary</div>
      </div>
      <div className="flex w-full flex-wrap justify-between gap-4">
        {data.map((item, index) => {
          const color = colors[index % colors.length];
          const backgroundColorWithOpacity = `${color}33`;

          return (
            <div
              key={index}
              className="rounded-[8px] shadow-custom py-3 px-2 h-[150px] w-[150px] flex flex-col justify-between"
              style={{ backgroundColor: backgroundColorWithOpacity }}
            >
              <div className="flex flex-col items-start gap-[12px]">
                <Users
                  className="h-10 w-10 rounded-[8px] p-2 text-white"
                  style={{ backgroundColor: color }}
                />
                <div className="w-full">
                  <div className="text-xl font-semibold">{item.count}</div>
                  <div>{item.description}</div>
                </div>
              </div>
              <div className="text-xs flex items-center text-[#1E7BC8] gap-2">
                <span className="text-[#00A81C]">{item.percentage}</span>
                {item.comparison}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
