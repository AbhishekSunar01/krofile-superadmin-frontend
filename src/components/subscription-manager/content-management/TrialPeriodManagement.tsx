import { useEffect } from "react";
import TextEditor from "../../custom-ui/TextEditor";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useTrialPeriodManagementStore } from "../../../store/subscriptionManagerStore";

type setSaveEnabled = (value: boolean) => void;

export default function TrailPeriodManagement({
  setSaveEnabled,
}: {
  setSaveEnabled: setSaveEnabled;
}) {
  const {
    days,
    title,
    body,
    tagLine,
    setTrialPeriod,
    setTitle,
    setBody,
    setTagLine,
  } = useTrialPeriodManagementStore();

  // Enable save button when any of the fields change
  useEffect(() => {
    setSaveEnabled(true); // Enable save button
  }, [days, title, body, tagLine]);

  return (
    <div className="flex flex-col items-start w-full gap-4 mt-6">
      <div className="px-3 w-full">
        <Label className="text-md">Trial Period</Label>
        <Input
          className="mt-2"
          value={days}
          onChange={(e) => setTrialPeriod(Number(e.target.value))}
        />
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
