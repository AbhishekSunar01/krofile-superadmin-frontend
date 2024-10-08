import React, { useState } from "react";
import edit from "../../../assets/svg/edit.svg";
import deleteIcon from "../../../assets/svg/delete.svg";
import cross from "../../../assets/svg/cross.svg";
import arrowRight from "../../../assets/svg/arrow-right.svg";
import krofileLogo from "../../../assets/images/krofile-logo.png";
import { MoreVertical } from "lucide-react";
import RichTextEditor from "../../custom-ui/RichTextEditor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { FileWithPreview, SubmittedMessage } from "../../../types/type";

const MAX_IMAGES = 5;

const SubmittedMessages: React.FC<{
  submittedMessages: SubmittedMessage[];
  setSubmittedMessages: React.Dispatch<
    React.SetStateAction<SubmittedMessage[]>
  >;
}> = ({ submittedMessages, setSubmittedMessages }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editMessage, setEditMessage] = useState("");
  const [editImages, setEditImages] = useState<FileWithPreview[]>([]);
  const [isImageOverlayOpen, setIsImageOverlayOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState<FileWithPreview[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditMessage(submittedMessages[index].text);
    setEditImages([...submittedMessages[index].images]);
  };

  const handleSaveEdit = (index: number) => {
    const updatedMessages = [...submittedMessages];
    updatedMessages[index] = {
      ...updatedMessages[index],
      text: editMessage,
      images: editImages,
    };
    setSubmittedMessages(updatedMessages);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditMessage("");
    setEditImages([]);
  };

  const handleEditUpload = (files: FileWithPreview[]) => {
    setEditImages((prevImages) => {
      const remainingSlots = MAX_IMAGES - prevImages.length;
      const newImages = files.slice(0, remainingSlots);
      return [...prevImages, ...newImages];
    });
  };

  const handleEditDeleteImage = (index: number) => {
    setEditImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleDelete = (index: number) => {
    setSubmittedMessages((prevMessages) =>
      prevMessages.filter((_, i) => i !== index)
    );
  };

  const handleImageClick = (messageIndex: number, imageIndex: number) => {
    const allImages = submittedMessages.flatMap((message) => message.images);
    setCarouselImages(allImages);
    const overallIndex = allImages.findIndex(
      (img) => img === submittedMessages[messageIndex].images[imageIndex]
    );
    setCurrentImageIndex(overallIndex);
    setIsImageOverlayOpen(true);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : carouselImages.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < carouselImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <>
      {submittedMessages.map((submittedMessage, index) => (
        <div key={index} className="mb-5">
          <div className="flex flex-row gap-2 items-center">
            <img src={krofileLogo} alt="Krofile Team" className="h-8 w-8" />
            <div className="flex items-center w-full">
              <div className="bg-ticketBg transform rotate-45 h-6 w-5"></div>
              <h3 className="-ml-5 z-10 text-sm font-medium py-1 px-3 text-white bg-ticketBg w-full rounded-t-md flex justify-between items-center">
                Krofile Team
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(index)}>
                      <img src={edit} alt="Edit" className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(index)}>
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="h-4 w-4 mr-2"
                      />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </h3>
            </div>
          </div>
          <div className="mb-2 p-4 ml-10 rounded-b-md text-justify border border-borderColor">
            {editingIndex === index ? (
              <>
                <RichTextEditor
                  value={editMessage}
                  onChange={setEditMessage}
                  onImageUpload={handleEditUpload}
                />
                <div className="mt-3 flex flex-row">
                  {editImages.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative mr-2">
                      <img
                        src={image.preview}
                        alt={`Uploaded ${imgIndex + 1}`}
                        className="w-12 h-12 object-cover rounded-md cursor-pointer"
                        onClick={() => handleImageClick(index, imgIndex)}
                      />
                      <img
                        src={cross}
                        onClick={() => handleEditDeleteImage(imgIndex)}
                        className="absolute -top-1 -right-1 flex items-center justify-center h-3 w-3 cursor-pointer"
                        aria-label="Delete image"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={() => handleSaveEdit(index)}
                    className="mr-2"
                  >
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outline">
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="text-sm -mt-5 break-all"
                  dangerouslySetInnerHTML={{
                    __html: submittedMessage.text,
                  }}
                />
                <div className="mt-3 flex flex-row justify-between">
                  {submittedMessage.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image.preview}
                      alt={`Attachment ${imgIndex + 1}`}
                      className="inline-block mr-2 w-12 h-12 object-cover rounded-md cursor-pointer"
                      onClick={() => handleImageClick(index, imgIndex)}
                    />
                  ))}
                  <span className="flex w-full text-sm items-end justify-end mr-2">
                    {submittedMessage.date}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {isImageOverlayOpen && (
        <Dialog open={isImageOverlayOpen} onOpenChange={setIsImageOverlayOpen}>
          <DialogContent className="flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl text-left font-semibold">
                Ticket Details
              </DialogTitle>
              <hr className="mb-4 mt-2 border-gray-300" />
            </DialogHeader>
            <div className="relative flex justify-center items-center w-full">
              {carouselImages.length > 0 && (
                <>
                  {currentImageIndex > 0 && (
                    <button
                      onClick={handlePreviousImage}
                      className="absolute -left-4 h-12 w-12 cursor-pointer z-10 rounded-full flex items-center justify-center"
                    >
                      <img
                        src={arrowRight}
                        alt="Previous"
                        className="transform rotate-180 w-6 h-6"
                      />
                    </button>
                  )}
                  <img
                    src={carouselImages[currentImageIndex]?.preview}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-[400px] object-contain"
                  />
                  {currentImageIndex < carouselImages.length - 1 && (
                    <button
                      onClick={handleNextImage}
                      className="absolute -right-4 h-12 w-12 cursor-pointer z-10 rounded-full flex items-center justify-center"
                    >
                      <img src={arrowRight} alt="Next" className="w-6 h-6" />
                    </button>
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SubmittedMessages;
