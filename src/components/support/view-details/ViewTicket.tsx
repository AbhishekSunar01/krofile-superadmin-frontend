import React, { useState } from "react";
import { ViewTicketProps } from "../../../types/type";
import arrow from "../../../assets/svg/arrow.svg";

const TicketDetails: React.FC<ViewTicketProps> = ({ data, onBack }) => {
  const [message, setMessage] = useState("");

  if (!data) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="w-full h-full bg-white rounded-md">
      <button
        onClick={onBack}
        className="text-[#525E6F] mb-2 flex items-center text-sm font-normal"
      >
        <img src={arrow} alt="back arrow" className=" h-8 w-8" /> Back
      </button>

      <div className="ml-3 mb-6 ">
        <h3 className=" text-xl font-semibold mb-4">Ticket Details</h3>
        <hr />
      </div>
      <div className="flex flex-row gap-6 text-sm font-normal text-[#525E6F]">
        <div className=" w-[250px] h-fit bg-gray-100 p-3 gap-[10px] rounded-lg">
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
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-semibold">Status</span>
            <span
              className={`text-sm font-medium ${
                data.status === "In Progress"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {data.status || "N/A"}
            </span>
          </div>
        </div>
        <div className="w-full ">
          <div className="flex flex-row gap-2">
            <img src={data.logo} alt={data.businessName} className=" h-8 w-8" />{" "}
            <h3 className="text-sm font-medium py-2 px-3 text-white bg-primary w-full rounded-t">
              {data.businessName || "N/A"}
            </h3>
          </div>
          <div className="mb-4 p-4 ml-10 rounded-b-md text-justify border border-[#E2E6E9]">
            <span className="text-sm">
              {data.description || "No description provided."}
            </span>
            <div className="mt-3 flex flex-wrap">
              {data.image && data.image.length > 0 ? (
                data.image.map((item: string, index: number) => (
                  <img
                    key={index}
                    src={item}
                    alt={`Attachment ${index + 1}`}
                    className="inline-block mr-2 w-20 h-20 object-cover rounded-md"
                  />
                ))
              ) : (
                <>{/* <p>No images available.</p> */}</>
              )}
            </div>
            <p className="text-right text-sm">{data.date || "N/A"}</p>
          </div>
          <div className="mb-4 p-4 bg-red-100 rounded-md">
            <h3 className="text-sm font-semibold text-red-800">Krofile Team</h3>
            <textarea
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Type here..."
              maxLength={300}
              value={message}
              onChange={handleInputChange}
            />
            <p className="text-right text-xs mt-2">{message.length}/300</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
