import noData from "../../assets/svg/noData.svg";

export default function NoData() {
  return (
    <div className="min-h-[80vh] w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center">
      <div className="flex flex-col text-base font-semibold items-center justify-center">
        <img src={noData} alt="No Data" className=" h-[48px] w-[48px]" />
        <p className="">No Data Found</p>
      </div>
      <h1 className=" text-base font-normal">
        No notifications at the moment. Stay tuned for updates from your
        businesses.
      </h1>
    </div>
  );
}
