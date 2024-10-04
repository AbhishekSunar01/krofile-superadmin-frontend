import { useEffect } from "react";
import TextEditor from "../../custom-ui/TextEditor";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useReferralPeriodManagementStore } from "../../../store/subscriptionManagerStore";

type setSaveEnabled = (value: boolean) => void;

export default function ReferralPeriodManagement({
  setSaveEnabled,
}: {
  setSaveEnabled: setSaveEnabled;
}) {
  const {
    getReferralMonth,
    giveReferralMonth,
    title,
    body,
    tagLine,
    setGetReferralMonths,
    setGiveReferralMonths,
    setTitle,
    setBody,
    setTagLine,
  } = useReferralPeriodManagementStore();

  useEffect(() => {
    setSaveEnabled(true);
  }, [getReferralMonth, giveReferralMonth, title, body, tagLine]);

  return (
    <div className="flex flex-col items-start w-full gap-4 mt-6">
      <div className="flex w-full">
        <div className="px-3 w-full">
          <Label className="text-md">Get Referral Months</Label>
          <Input
            className="mt-2"
            value={getReferralMonth}
            onChange={(e) => setGetReferralMonths(Number(e.target.value))}
          />
        </div>
        <div className="px-3 w-full">
          <Label className="text-md">Give Referral Months</Label>
          <Input
            className="mt-2"
            value={giveReferralMonth}
            onChange={(e) => setGiveReferralMonths(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="w-full px-3 font-medium">
        Title <span className="text-destructive">*</span>
        <div className="p-4 mt-2 rounded-lg border flex flex-col items-start gap-2">
          <TextEditor
            value={title}
            onChange={(value) => setTitle(value)}
            placeholder="Type here..."
          />
        </div>
      </div>
      <div className="w-full px-3 font-medium">
        Body <span className="text-destructive">*</span>
        <div className="p-4 mt-2 rounded-lg border flex flex-col items-start gap-2">
          <TextEditor
            value={body}
            onChange={(value) => setBody(value)}
            placeholder="Type here..."
          />
        </div>
      </div>
      <div className="w-full px-3 font-medium">
        Tagline <span className="text-destructive">*</span>
        <div className="p-4 mt-2 rounded-lg border flex flex-col items-start gap-2">
          <TextEditor
            value={tagLine}
            onChange={(value) => setTagLine(value)}
            placeholder="Type here..."
          />
        </div>
      </div>
    </div>
  );
}
