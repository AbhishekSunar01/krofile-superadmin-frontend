import React, { useState } from "react";
import { ViewTicketProps } from "../../../types/type";
import arrow from "../../../assets/svg/arrow.svg";
import logo from "../../../assets/images/logo.jpg";
import krofileLogo from "../../../assets/images/krofile-logo.png";

import cross from "../../../assets/svg/cross.svg";

import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";
import SubmittedMessages from "./Message";
import { FileWithPreview, SubmittedMessage } from "../../../types/type";

import "react-quill/dist/quill.snow.css";
import RichTextEditor from "./RichTextEditor";

const TicketDetails: React.FC<ViewTicketProps> = ({
  data,
  onBack,
  isOpen,
  availableStatuses,
}) => {
  const [message, setMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState<FileWithPreview[]>([]);
  const [submittedMessages, setSubmittedMessages] = useState<
    SubmittedMessage[]
  >([]);

  if (!data) return null;

  const handleInputChange = (content: string) => {
    setMessage(content);
  };

  const handleUpload = (files: FileWithPreview[]) => {
    setUploadedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = () => {
    if (message.trim() || uploadedImages.length > 0) {
      const newSubmittedMessage: SubmittedMessage = {
        text: message,
        images: [...uploadedImages],
        date: new Date().toLocaleString(),
      };
      setSubmittedMessages([...submittedMessages, newSubmittedMessage]);
      setMessage("");
      setUploadedImages([]);
    }
  };

  let colorClass = "";

  switch (data.status) {
    case "Pending":
      colorClass = "text-accentOrange";
      break;
    case "In Progress":
      colorClass = "text-primary";
      break;
    case "Completed":
      colorClass = "text-accentGreen";
      break;
    case "Rejected":
      colorClass = "text-destructive";
      break;
    default:
      colorClass = "text-gray-500";
  }

  return (
    <div
      className={`w-full h-full bg-white rounded-md ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <button
        onClick={onBack}
        className="text-dialogText mb-2 flex items-center text-sm font-normal"
      >
        <img src={arrow} alt="back arrow" className="h-8 w-8" /> Back
      </button>

      <div className="ml-3 mb-6 ">
        <h3 className="text-xl font-semibold mb-4">Ticket Details</h3>
        <hr />
      </div>
      <div className="flex flex-row gap-6 text-sm font-normal text-dialogText">
        <div className="w-[250px] h-fit bg-gray-100 px-3 pt-2 pb-1 gap-[10px] rounded-lg">
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-semibold">Topic</span>
            <span>{data.topic || "N/A"}</span>
          </div>
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-semibold">Date</span>
            <span>{data.date || "N/A"}</span>
          </div>
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-semibold">ID</span>
            <span>{data._id || "N/A"}</span>
          </div>
          <div className=" flex flex-col">
            <div className="text-sm font-semibold">Status</div>
            <span className={`text-sm font-medium ${colorClass} `}>
              {" "}
              <Select>
                <SelectTrigger variant={"noBorder"}>
                  {data.status || "Select a Status"}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableStatuses.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </span>
          </div>
        </div>
        <div className="w-full">
          <div>
            <div className="flex flex-row gap-2 items-center">
              <img src={logo} alt={data.businessName} className="h-8 w-8" />{" "}
              <div className="flex items-center w-full">
                <div className="bg-primary transform rotate-45 h-6 w-5"></div>
                <h3 className="-ml-5 z-10 text-sm font-medium py-2 px-3 text-white bg-primary w-full rounded-t-md">
                  {data.businessName || "N/A"}
                </h3>
              </div>
            </div>
            <div className="p-4 ml-10 rounded-b-md text-justify border border-borderColor">
              <span className="text-sm">
                {data.description || "No description provided."}
              </span>
              <div className="mt-3 flex flex-row justify-between">
                {data.image && data.image.length > 0 ? (
                  data.image.map((item: string, index: number) => (
                    <img
                      key={index}
                      src={item}
                      alt={`Attachment ${index + 1}`}
                      className="inline-block mr-2 w-12 h-12 object-cover rounded-md"
                    />
                  ))
                ) : (
                  <p className="w-full">No images available.</p>
                )}
                <span className="flex w-full text-sm items-end justify-end">
                  {data.date || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="h-4 border-l ml-16"></div>

          <hr className="mb-4 border-gray-300" />
          <SubmittedMessages
            submittedMessages={submittedMessages}
            setSubmittedMessages={setSubmittedMessages}
          />

          <div>
            <div className="flex flex-row gap-2 items-center">
              <img src={krofileLogo} alt="Krofile Team" className="h-8 w-8" />
              <div className="flex items-center w-full">
                <div className="bg-ticketBg transform rotate-45 h-6 w-5"></div>
                <h3 className="-ml-5 z-10 text-sm font-medium py-2 px-3 text-white bg-ticketBg w-full rounded-t-md">
                  Krofile Team
                </h3>
              </div>
            </div>
            <div className="mb-2 p-4 ml-10 rounded-b-md text-justify border border-borderColor">
              <RichTextEditor
                value={message}
                onChange={handleInputChange}
                onImageUpload={handleUpload}
              />
              <div className="mt-3 flex flex-row">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative mr-2">
                    <img
                      src={image.preview}
                      alt={`Uploaded ${index + 1}`}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <img
                      src={cross}
                      onClick={() => handleDeleteImage(index)}
                      className="absolute -top-1 -right-1 flex items-center justify-center h-3 w-3 cursor-pointer"
                      aria-label="Delete image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end mt-[12px]">
            <Button className="rounded-lg" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
