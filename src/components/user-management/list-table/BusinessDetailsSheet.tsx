/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
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

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const InfoSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-gray-100 p-5 rounded-md flex flex-col gap-2">
      <span className="text-base font-medium">{title}</span>
      {children}
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto py-5 px-4">
        <SheetHeader>
          <SheetTitle className="text-base font-semibold text-primary">
            View Details
          </SheetTitle>
        </SheetHeader>
        <div className="pt-4 flex flex-col gap-4 text-sm">
          {/* Customer Information */}
          <InfoSection title="Customer Information">
            <span>Full Name: {businessData.customerName}</span>
            <span>Email: {businessData.customerEmail}</span>
            <span>Country: {businessData.country}</span>
            <span>Customer Type: {businessData.customerType}</span>
            <span>Contact Number: {businessData.customerContact}</span>
          </InfoSection>

          {/* Business Information */}
          <InfoSection title="Business Information">
            <span>Business Name: {businessData.businessName}</span>
            <span>Industry Type: {businessData.industryType}</span>
            <span>Email: {businessData.customerEmail}</span>
            <span>Location: {businessData.location}</span>
            <span>Contact Number: {businessData.contactNumber}</span>
            <span>No. of Locations: {businessData.numberOfLocations}</span>
            <span>Website: {businessData.website}</span>
            <span>Team Members: {businessData.teamMembers}</span>
          </InfoSection>

          {/* Subscription Details */}
          <InfoSection title="Subscription Details">
            <div className="flex justify-between items-center">
              <span>Subscription History</span>
              <SubscriptionDetails businessData={businessData} />
            </div>
            <span>Current Plan: {businessData.plan}</span>
            <span>Status: {businessData.subStatus}</span>
            <span>Registration Date: {formatDate(businessData.regDate)}</span>
            <span>Last Renewal: {formatDate(businessData.regDate)}</span>
            <span>Expiry Date: {businessData.expiryDate}</span>
            <div className="flex justify-between items-center">
              <span>Auto Renewal:</span>
              <Switch />
            </div>
          </InfoSection>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BusinessDetailsSheet;

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  businessData,
}) => {
  const subscriptionHistory = useMemo(
    () => [
      {
        date: "2023-10-01",
        action: "Upgrade",
        oldPlan: "Basic",
        newPlan: "Premium",
        admin: "John Doe",
      },
      {
        date: "2023-10-02",
        action: "Downgrade",
        oldPlan: "Premium",
        newPlan: "Basic",
        admin: "Jane Smith",
      },
      {
        date: "2023-10-03",
        action: "Cancel",
        oldPlan: null,
        newPlan: "None",
        admin: "Alice Johnson",
      },
      {
        date: "2023-10-04",
        action: "Renew",
        oldPlan: "Basic",
        newPlan: null,
        admin: "Bob Brown",
      },
    ],
    []
  );

  const renderCellValue = (value: string | null) => value || "--";

  const tableRows = useMemo(
    () =>
      subscriptionHistory.map((entry, index) => (
        <TableRow key={index}>
          <TableCell>{renderCellValue(entry.date)}</TableCell>
          <TableCell>{renderCellValue(entry.action)}</TableCell>
          <TableCell>{renderCellValue(entry.oldPlan)}</TableCell>
          <TableCell>{renderCellValue(entry.newPlan)}</TableCell>
          <TableCell>{renderCellValue(entry.admin)}</TableCell>
        </TableRow>
      )),
    [subscriptionHistory]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer font-normal text-xs underline text-primary">
          View History
        </span>
      </DialogTrigger>
      <DialogContent className="p-6 min-w-[800px]" variant="cross">
        <DialogHeader>
          <DialogTitle>
            <img src={logo} alt="Business Logo" className="h-[48px] w-[48px]" />
          </DialogTitle>
        </DialogHeader>

        <div className="gap-4">
          <div className="gap-2">
            <h1 className="text-lg font-medium">Subscription History</h1>
            <span className="text-sm font-normal">
              Access detailed records of all upgrades and downgrades
            </span>
          </div>

          <div className="py-8">
            <div className="flex items-center justify-between">
              <div className="pl-6 text-xl font-semibold flex flex-col">
                {businessData.businessName}
                <span className="text-sm font-normal text-dialogText">
                  {businessData.industryType}
                </span>
                <span className="text-sm font-normal text-dialogText">
                  {businessData.location}
                </span>
              </div>
              <div className="gap-[6px] flex flex-col text-dialogText">
                <span className="text-sm font-normal flex justify-between w-full">
                  Reg Date: <span>{businessData.regDate}</span>
                </span>
                <span className="text-sm font-normal flex justify-between gap-4 w-full">
                  Last Renewal: <span>{businessData.regDate}</span>
                </span>
              </div>
            </div>

            <div className="px-6 pt-12">
              <Table className="border rounded-md border-borderColor">
                <TableHeader>
                  <TableRow>
                    {["Date", "Action", "Old Plan", "New Plan", "Admin"].map(
                      (heading, idx) => (
                        <TableHead
                          key={idx}
                          className="text-black font-semibold"
                        >
                          {heading}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionHistory.length > 0 ? (
                    tableRows
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
