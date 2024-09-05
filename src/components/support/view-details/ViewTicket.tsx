import React, { DragEvent, ChangeEvent, useState, useRef } from "react";
import { ViewTicketProps } from "../../../types/type";
import arrow from "../../../assets/svg/arrow.svg";
import krofileLogo from "../../../assets/images/krofile-logo.png";
import add from "../../../assets/svg/add.svg";
import bold from "../../../assets/svg/bold.svg";
import underline from "../../../assets/svg/underline.svg";
import uolist from "../../../assets/svg/unorderlist.svg";
import italic from "../../../assets/svg/italic.svg";
import edit from "../../../assets/svg/edit.svg";
import upload from "../../../assets/svg/computer.svg";
import cloud from "../../../assets/svg/cloud.svg";
import deleteIcon from "../../../assets/svg/delete.svg";
import cross from "../../../assets/svg/cross.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Textarea } from "../../ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";

interface FileWithPreview extends File {
  preview: string;
  id: string;
}

const Upload: React.FC<{ onUpload: (files: FileWithPreview[]) => void }> = ({
  onUpload,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36);
  };

  const processFile = (file: File): FileWithPreview | null => {
    if (file.size <= 10 * 1024 * 1024) {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: generateUniqueId(),
      });
    }
    return null;
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
        .map(processFile)
        .filter((file): file is FileWithPreview => file !== null);

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    const newFiles = Array.from(droppedFiles)
      .map(processFile)
      .filter((file): file is FileWithPreview => file !== null);

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    if (files.length > 0) {
      console.log("Uploading:", files);
      onUpload(files);
      setIsDialogOpen(false);
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      alert("Please select a file first.");
    }
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prevFiles) => {
      const fileToDelete = prevFiles.find((file) => file.id === id);
      if (fileToDelete) {
        URL.revokeObjectURL(fileToDelete.preview);
      }
      return prevFiles.filter((file) => file.id !== id);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded hover:bg-gray-100">
          <img src={add} alt="Add" className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className="gap-2 text-sm px-4 py-2 cursor-pointer"
          disabled={true}
        >
          <img src={edit} alt="Edit" className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 text-sm px-4 py-2 cursor-pointer"
          onSelect={() => setIsDialogOpen(true)}
        >
          <img src={upload} alt="Upload" className="h-4 w-4" />
          Upload from computer
        </DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild />
        <DialogContent variant={"bordered"}>
          <DialogTitle className="text-xl font-semibold">Add Image</DialogTitle>
          <hr className="mb-4 border-gray-300" />
          {files.length > 0 && (
            <div className="mb-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded mb-2 relative overflow-hidden text-sm"
                >
                  <div className="flex items-center gap-2 z-10">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-6 w-6 rounded object-cover"
                    />
                    <span>{file.name}</span>
                  </div>
                  <div className="flex items-center h-2 gap-6 z-10">
                    <span>{(file.size / (1024 * 1024)).toFixed(1)}MB</span>
                    <button onClick={() => handleDeleteFile(file.id)}>
                      <img src={deleteIcon} alt="Delete" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border border-dashed border-borderColor rounded-md min-h-40 w-full flex items-center justify-center flex-col gap-4 p-8"
          >
            <img src={cloud} alt="Cloud" className="h-12 w-12" />
            <div className="flex flex-col items-center justify-center font-normal gap-y-3">
              <span className="text-base">
                Select a file or drag and drop here
              </span>
              <span className="text-sm pb-6">
                Jpg and png, file size not more than 10 mb.
              </span>
              <input
                type="file"
                accept="image/jpeg, image/png"
                style={{ display: "none" }}
                id="fileInput"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
              />
              <Button
                variant="outline1"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mt-4">
            <Button onClick={handleUpload} className=" rounded-xl">
              Upload
            </Button>
            <Button
              className=" rounded-xl"
              variant="outline1"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
};

interface SubmittedMessage {
  text: string;
  images: FileWithPreview[];
  date: string;
}

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
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
      colorClass = "text-orange-500";
      break;
    case "In Progress":
      colorClass = "text-blue-500";
      break;
    case "Completed":
      colorClass = "text-green-500";
      break;
    case "Rejected":
      colorClass = "text-red-500";
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
              <img
                src={data.logo}
                alt={data.businessName}
                className="h-8 w-8"
              />{" "}
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
            <div className="h-4 border-l ml-16"></div>
          </div>

          <hr className="mb-4 border-gray-300" />
          {submittedMessages.map((submittedMessage, index) => (
            <div key={index}>
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
                <span className="text-sm">{submittedMessage.text}</span>
                <div className="mt-3 flex flex-row justify-between">
                  {submittedMessage.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image.preview}
                      alt={`Attachment ${imgIndex + 1}`}
                      className="inline-block mr-2 w-12 h-12 object-cover rounded-md"
                    />
                  ))}
                  <span className="flex w-full text-sm items-end justify-end">
                    {submittedMessage.date}
                  </span>
                </div>
              </div>
              <div className="h-4 border-l ml-16"></div>
            </div>
          ))}

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
              <div className="flex gap-4 cursor-pointer w-fit">
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <img src={bold} alt="Bold" className="h-6 w-6" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <img src={italic} alt="Italic" className="h-6 w-6" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                  >
                    <img src={underline} alt="Underline" className="h-6 w-6" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="unorderlist"
                    aria-label="Toggle un-orderlist"
                  >
                    <img
                      src={uolist}
                      alt="Unordered List"
                      className="h-6 w-6"
                    />
                  </ToggleGroupItem>
                  <Upload onUpload={handleUpload} />
                </ToggleGroup>
              </div>
              <div className="relative">
                <Textarea
                  className="w-full p-2 mt-2 bg-gray-100 h-[120px] resize-none"
                  placeholder="Type here..."
                  maxLength={300}
                  value={message}
                  onChange={handleInputChange}
                />
                <div className="flex items-end justify-end text-xs absolute bottom-2 right-2">
                  {message.length}/300
                </div>
              </div>
              <div className="mt-3 flex flex-row justify-between">
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
