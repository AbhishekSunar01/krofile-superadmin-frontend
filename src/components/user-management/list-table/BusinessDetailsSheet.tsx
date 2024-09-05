/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { Switch } from "../../ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import logo from "../../../assets/images/logo.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  BusinessDetailsSheetProps,
  SubscriptionDetailsProps,
} from "../../../types/type";

const BusinessDetailsSheet: React.FC<BusinessDetailsSheetProps> = ({
  isOpen,
  onOpenChange,
  businessData,
}) => {
  if (!businessData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className=" overflow-y-auto py-5 px-4">
        <SheetHeader>
          <SheetTitle className="text-base font-semibold text-[#1E7BC8]">
            View Details
          </SheetTitle>
        </SheetHeader>
        <div className="pt-4 flex flex-col gap-[10px] text-sm">
          {/* Customer Information */}
          <div className="bg-gray-100 p-5 rounded-md gap-y-[10px] flex flex-col">
            <span className="text-base font-medium">Customer Information</span>
            <span>Full Name: {businessData.customerName}</span>
            <span>Email: {businessData.customerEmail}</span>
            <span>Country: {businessData.country}</span>
            <span>Customer Type: {businessData.customerType}</span>
            <span>Contact Number: {businessData.customerContact}</span>
          </div>

          {/* Business Information */}
          <div className="bg-gray-100 p-5 rounded-md gap-y-[10px] flex flex-col">
            <span className="text-base font-medium">Business Information</span>
            <span>Business Name: {businessData.businessName}</span>
            <span>Industry Type: {businessData.industryType}</span>
            <span>Email: {businessData.customerEmail}</span>
            <span>Location: {businessData.location}</span>
            <span>Contact Number: {businessData.contactNumber}</span>
            <span>No. of Location: {businessData.numberOfLocations}</span>
            <span>Website: {businessData.website}</span>
            <span>Team Members: {businessData.teamMembers}</span>
          </div>

          {/* Subscription Details */}
          <div className="bg-gray-100 p-5 rounded-md gap-y-[10px] flex flex-col">
            <span className="text-base font-medium flex justify-between items-center">
              Subscription Details{" "}
              <SubscriptionDetails businessData={businessData} />
            </span>{" "}
            <span>Current Plan: {businessData.plan}</span>
            <span>Status: {businessData.subStatus}</span>
            <span>
              Registration Date:{" "}
              {new Date(businessData.regDate).toLocaleDateString()}
            </span>
            <span>
              Last Renewal:{" "}
              {new Date(businessData.regDate).toLocaleDateString()}
            </span>
            <span>Expiry Date: {businessData.expiryDate}</span>
            <span className="flex justify-between">
              Auto Renewal:
              <Switch />
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BusinessDetailsSheet;

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  businessData,
}) => {
  const data = [
    {
      Date: "2023-10-01",
      Action: "Upgrade",
      oldPlan: "Basic",
      newPlan: "Premium",
      Admin: "John Doe",
    },
    {
      Date: "2023-10-02",
      oldPlan: "Premium",
      newPlan: "Basic",
      Admin: "Jane Smith",
    },
    {
      Date: "2023-10-03",
      Action: "Cancel",
      newPlan: "None",
      Admin: "Alice Johnson",
    },
    {
      Date: "2023-10-04",
      Action: "Renew",
      oldPlan: "Basic",
      newPlan: "",
      Admin: "Bob Brown",
    },
  ];

  const renderCell = (value: any) => (value ? value : "--");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className=" cursor-pointer font-normal text-xs underline text-[#1E7BC8]">
          View History
        </span>
      </DialogTrigger>
      <DialogContent className="p-6 min-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            <img src={logo} alt="" className=" h-[48px] w-[48px]" />
          </DialogTitle>
        </DialogHeader>

        <div className="gap-4">
          <div className="gap-2">
            <h1 className=" text-lg font-medium">Subscription History</h1>
            <span className=" text-sm font-normal">
              Access detailed records of all upgrades and downgrades
            </span>
          </div>
          <div className="py-8 ">
            <div className="flex items-center justify-between">
              <div className=" pl-6 text-xl font-semibold flex flex-col">
                {businessData.businessName}
                <span className="text-sm font-normal text-dialogText">
                  {businessData.industryType}
                </span>
                <span className="text-sm font-normal text-dialogText">
                  {businessData.location}
                </span>
              </div>
              <div className="gap-[6px] flex flex-col text-dialogText ">
                <span className="text-sm font-normal flex justify-between w-full">
                  Reg Date: <span>{businessData.regDate}</span>
                </span>
                <span className="text-sm font-normal flex justify-between  gap-4 w-full">
                  Last Renewal: <span>{businessData.regDate}</span>
                </span>
              </div>
            </div>
            <div className="px-6 pt-12">
              <Table className=" border rounded-md border-borderColor">
                <TableHeader>
                  <TableRow>
                    <TableHead className=" text-black font-semibold">
                      Date
                    </TableHead>
                    <TableHead className=" text-black font-semibold">
                      Action
                    </TableHead>
                    <TableHead className=" text-black font-semibold">
                      Old Plan
                    </TableHead>
                    <TableHead className=" text-black font-semibold">
                      New Plan
                    </TableHead>
                    <TableHead className=" text-black font-semibold">
                      Admin
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{renderCell(item.Date)}</TableCell>
                        <TableCell>{renderCell(item.Action)}</TableCell>
                        <TableCell>{renderCell(item.oldPlan)}</TableCell>
                        <TableCell>{renderCell(item.newPlan)}</TableCell>
                        <TableCell>{renderCell(item.Admin)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No Data Available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
