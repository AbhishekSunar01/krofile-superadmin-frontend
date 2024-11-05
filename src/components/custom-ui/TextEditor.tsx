import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import bold from "../../assets/svg/bold.svg";
import italic from "../../assets/svg/italic.svg";
import underline from "../../assets/svg/underline.svg";
import uolist from "../../assets/svg/unorderlist.svg";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CHARACTER_LIMIT = 500;

const TextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const quillRef = useRef<ReactQuill>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const textContent = value.replace(/<[^>]*>/g, "");
    setCharCount(textContent.length);
  }, [value]);

  const handleChange = (content: string) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const text = quill.getText().trim();
      if (text.length <= CHARACTER_LIMIT) {
        onChange(content);
      } else {
        const trimmedDelta = quill.getContents(0, CHARACTER_LIMIT);
        quill.setContents(trimmedDelta);
        onChange(quill.root.innerHTML);
      }
    }
  };

  const handleFormat = useCallback((format: string) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.focus();
      const selection = quill.getSelection();
      if (selection) {
        if (format === "list") {
          const currentFormat = quill.getFormat(selection);
          quill.format(
            "list",
            currentFormat.list === "bullet" ? false : "bullet"
          );
        } else {
          const currentFormat = quill.getFormat(selection);
          quill.format(format, !currentFormat[format]);
        }
      } else {
        const length = quill.getLength();
        const currentFormat = quill.getFormat(0, length);
        quill.formatText(0, length, format, !currentFormat[format]);
      }

      const newActiveFormats = quill.getFormat();
      setActiveFormats(
        Object.keys(newActiveFormats).filter((f) => newActiveFormats[f])
      );
    }
  }, []);

  const modules = {
    toolbar: false,
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 cursor-pointer w-full mb-2">
        <button
          onClick={() => handleFormat("bold")}
          className={`p-1 rounded ${
            activeFormats.includes("bold") ? "bg-gray-200" : ""
          }`}
        >
          <img src={bold} alt="Bold" className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleFormat("italic")}
          className={`p-1 rounded ${
            activeFormats.includes("italic") ? "bg-gray-200" : ""
          }`}
        >
          <img src={italic} alt="Italic" className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleFormat("underline")}
          className={`p-1 rounded ${
            activeFormats.includes("underline") ? "bg-gray-200" : ""
          }`}
        >
          <img src={underline} alt="Underline" className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleFormat("list")}
          className={`p-1 rounded ${
            activeFormats.includes("list") ? "bg-gray-200" : ""
          }`}
        >
          <img src={uolist} alt="Unordered List" className="h-6 w-6" />
        </button>
      </div>
      <div className="relative ">
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={handleChange}
          modules={modules}
          className="w-full px-1 bg-mainBg h-[120px] break-all font-medium"
          placeholder="Type here..."
        />
        <div className="flex items-end justify-end text-xs absolute bottom-2 right-2">
          {charCount}/{CHARACTER_LIMIT}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
