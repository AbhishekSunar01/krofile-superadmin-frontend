import background from "../../../assets/png/Gradient background.png";
import { useReferralPeriodManagementStore } from "../../../store/subscriptionManagerStore";
// import FinalPreviewTable from "../FinalPreviewTable";
import parse from "html-react-parser";

export default function ReferralPeriodManagement() {
  const { title, body, tagLine } = useReferralPeriodManagementStore();

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
      className="p-11 flex flex-col items-center gap-6 mt-6"
    >
      <div className="flex flex-col items-center">
        <h2>{parse(title)}</h2>
        <p className="text-center">{parse(body)}</p>
      </div>

      <div className="flex justify-center w-[40%] relative h-[72px]">
        <div className="w-[135px] border absolute right-[20%] rounded-r-[32px] flex flex-col justify-center h-[71px] items-center bg-mainBg border-gray-200">
          <span className="text-sm">Pay Upfront</span>
          <span className="text-sm muted">25%</span>
          <span className="text-sm muted">Annual Plan</span>
        </div>
        <div className="w-[135px] border absolute left-[22%] border-accentDarkGreen rounded-[32px] flex flex-col h-[71px] items-center bg-white justify-center">
          <h5 className="text-sm">Pay Monthly</h5>
          <span className="muted text-sm">Monthly Billing</span>
        </div>
      </div>

      <div>{parse(tagLine)}</div>

      {/* <FinalPreviewTable /> */}
    </div>
  );
}
