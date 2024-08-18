import { Textarea } from "../ui/textarea";
import TextFormatter from "../custom-ui/TextFormatter";
import { useEffect } from "react";
import { useContentManagementStore } from "../../app/store";

export default function ContentManagement() {
  const { title, body, tagLine, setTitle, setBody, setTagLine } =
    useContentManagementStore();

  useEffect(() => {
    console.log("Title: ", title);
    console.log("Body: ", body);
    console.log("Tagline: ", tagLine);
  }, [title, body, tagLine]);

  return (
    <div className="flex flex-col items-start w-full gap-4">
      <div className="w-full px-3 font-medium">
        Title <span className="text-destructive">*</span>
        <div className="p-4 mt-2 rounded-lg border flex flex-col items-start gap-2">
          <TextFormatter />
          <Textarea
            className="bg-mainBg h-16"
            placeholder="Type here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full px-3 font-medium">
        Body <span className="text-destructive">*</span>
        <div className="p-4 mt-2 rounded-lg border flex flex-col items-start gap-2">
          <TextFormatter />
          <Textarea
            className="bg-mainBg h-16"
            placeholder="Type here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full px-3 font-medium">
        Tagline <span className="text-destructive">*</span>
        <div className="p-4 mt-2 rounded-lg border flex flex-col items-start gap-2">
          <TextFormatter />
          <Textarea
            className="bg-mainBg h-16"
            placeholder="Type here..."
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
