import React, { DragEvent, ChangeEvent, useState, useRef } from "react";
import add from "../../../assets/svg/add.svg";
import upload from "../../../assets/svg/computer.svg";
import cloud from "../../../assets/svg/cloud.svg";
import edit from "../../../assets/svg/edit.svg";
import deleteIcon from "../../../assets/svg/delete.svg";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { FileWithPreview } from "../../../types/type";

const MAX_FILES = 5;

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

      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles].slice(0, MAX_FILES);
        if (updatedFiles.length > MAX_FILES) {
          alert(`You can only upload a maximum of ${MAX_FILES} images.`);
        }
        return updatedFiles;
      });
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

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles].slice(0, MAX_FILES);
      if (updatedFiles.length > MAX_FILES) {
        alert(`You can only upload a maximum of ${MAX_FILES} images.`);
      }
      return updatedFiles;
    });
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    if (files.length > 0) {
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
            <div className="mb-4  max-h-[300px] overflow-y-auto">
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
            <div className="flex flex-col items-center justify-center font-normal gap-y-3 text-center">
              <span className="text-base">
                Select a file or drag and drop here
              </span>
              <span className="text-sm pb-6">
                Jpg and png, file size not more than 10 mb. Maximum {MAX_FILES}{" "}
                images.
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
                disabled={files.length >= MAX_FILES}
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

export default Upload;
