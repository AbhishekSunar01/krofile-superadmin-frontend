import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Bold, Italic, Underline, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const TextFormatter = ({
  quillRef,
}: {
  quillRef: React.MutableRefObject<any>;
}) => {
  const applyFormat = (format: string) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format(format, !quill.getFormat()[format]);
    }
  };

  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem
        value="bold"
        aria-label="Toggle bold"
        onClick={() => applyFormat("bold")}
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        onClick={() => applyFormat("italic")}
      >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        aria-label="Toggle underline"
        onClick={() => applyFormat("underline")}
      >
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="list"
        aria-label="Toggle list"
        onClick={() => applyFormat("list")}
      >
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

const TextEditor = ({ value, onChange }: { value: any; onChange: any }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <div className="border-none w-full flex flex-col gap-2">
      <div id="toolbar" className="w-full flex items-start border-black">
        <TextFormatter quillRef={quillRef} />
      </div>
      <div className="rounded-xl overflow-hidden">
        <ReactQuill
          ref={quillRef}
          className="bg-mainBg rounded-xl border-none"
          value={value}
          onChange={onChange}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default TextEditor;
