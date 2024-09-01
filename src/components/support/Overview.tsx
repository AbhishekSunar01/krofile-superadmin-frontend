import overViewData from "../../json/dummyData/overViewData.json";

export default function Overview() {
  return (
    <div>
      {overViewData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-start p-4 border-b border-gray-200"
        >
          <div className="flex gap-1 items-center mb-3 text-sm">
            <img src={item.icon} alt="Icon" className="mr-2" />
            <h3 className="font-normal text-sm">{item.title}</h3>{" "}
            <span className="font-semibold text-sm">{item.businessName}</span>
          </div>
          <div className="flex text-sm gap-2 items-center ml-10 font-normal">
            <img
              src={item.img}
              alt={`${item.img} logo`}
              className=" rounded-full h-8 w-8 object-cover"
            />
            <div className="gap-2">
              {item.source} • {item.category} •
              <span className="text-gray-500 text-sm"> {item.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
