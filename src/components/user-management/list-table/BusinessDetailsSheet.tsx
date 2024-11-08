/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
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
  PaymentDetailsProps,
  SubscriptionDetailsProps,
} from "../../../types/type";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { CalendarDays } from "lucide-react";
import { addMonths, format } from "date-fns";

const BusinessDetailsSheet: React.FC<BusinessDetailsSheetProps> = ({
  isOpen,
  onOpenChange,
  businessData,
  onLocationClick,
}) => {
  if (!businessData) return null;

  const [extendedExpiryDates, setExtendedExpiryDates] = useState<
    Record<string, string>
  >({});

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };
  const handleLocationClick = () => {
    if ((businessData.numberOfLocations ?? 0) > 1) {
      if (businessData.customerEmail) {
        onLocationClick(businessData.customerEmail);
      }
    }
  };

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

  const setExtendedExpiryDate = (businessId: string, date: string) => {
    setExtendedExpiryDates((prev) => ({
      ...prev,
      [businessId]: date,
    }));
  };

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
            <span>Contact Number: {businessData.contactNumber}</span>{" "}
            <span>
              No. of Locations:{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocationClick();
                }}
                className={
                  (businessData.numberOfLocations ?? 0) > 1
                    ? "cursor-pointer text-primary underline"
                    : ""
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLocationClick();
                  }
                }}
              >
                {businessData.numberOfLocations}
              </span>
            </span>
            <span>Website: {businessData.website}</span>
            <span>Team Members: {businessData.teamMembers}</span>
          </InfoSection>

          {/* Subscription Details */}
          <InfoSection title="Subscription Details">
            <div className="-mt-7 flex justify-end items-center mb-1">
              <SubscriptionDetails businessData={businessData} />
            </div>
            <span>Current Plan: {businessData.plan}</span>
            <span>Status: {businessData.subStatus}</span>
            <span>Registration Date: {formatDate(businessData.regDate)}</span>
            <span>Last Renewal: {formatDate(businessData.regDate)}</span>{" "}
            <div className=" flex justify-between items-center">
              <span>
                Next Payment Date:{" "}
                {businessData?.expiryDate
                  ? formatDate(businessData.expiryDate)
                  : "--"}
              </span>
              <PaymentDetails
                businessData={businessData}
                onOpenChange={onOpenChange}
                setExtendedExpiryDate={(date) =>
                  setExtendedExpiryDate(businessData._id, date)
                }
              />
            </div>{" "}
            {extendedExpiryDates[businessData._id] && (
              <div className="flex justify-between items-center">
                <span>
                  Extended Upto: {extendedExpiryDates[businessData._id]}
                </span>
                <PaymentDetails
                  businessData={businessData}
                  onOpenChange={onOpenChange}
                  setExtendedExpiryDate={(date) =>
                    setExtendedExpiryDate(businessData._id, date)
                  }
                />
              </div>
            )}
          </InfoSection>

          {/* Renewal */}
          <InfoSection title="Auto-Renewal Setting">
            {" "}
            <div className="-mt-7 flex justify-end items-center mb-1">
              <SubscriptionDetails businessData={businessData} />
            </div>
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

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  businessData,
  onOpenChange,
  setExtendedExpiryDate,
}) => {
  const [selectedMonths, setSelectedMonths] = useState("1month");
  const [showMainDialog, setShowMainDialog] = useState(false);

  const calculateNewExpiryDate = () => {
    const currentExpiryDate = businessData.expiryDate
      ? new Date(businessData.expiryDate)
      : new Date();
    const monthsToAdd = getMonthsNumber(selectedMonths);
    const newExpiryDate = addMonths(currentExpiryDate, monthsToAdd);
    return format(newExpiryDate, "MMM dd, yyyy");
  };

  const getMonthsNumber = (value: string) => {
    return parseInt(value.replace("months", "").replace("month", ""));
  };

  const handleConfirm = () => {
    const newExpiry = calculateNewExpiryDate();
    setExtendedExpiryDate(newExpiry);
    onOpenChange(true);
    setShowMainDialog(false);
  };

  return (
    <>
      <Dialog open={showMainDialog} onOpenChange={setShowMainDialog}>
        <DialogTrigger asChild className="cursor-pointer">
          <CalendarDays />
        </DialogTrigger>
        <DialogContent className="p-6 min-w-[400px]" variant="cross">
          <DialogHeader>
            <DialogTitle>Extend Next Payment Dates</DialogTitle>
            <hr />
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-base">
              You are about to extend the next payment date for this
              subscription, delaying the scheduled payment while ensuring
              continued service for the user. Please confirm the new payment
              date, ensuring it aligns with the business policy.
            </p>
            <p className="text-base font-medium">Extend date by:</p>

            <RadioGroup
              defaultValue="1month"
              value={selectedMonths}
              onValueChange={setSelectedMonths}
            >
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1month" id="r1" variant="dot" />
                  <Label htmlFor="r1">1 month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2months" id="r2" variant="dot" />
                  <Label htmlFor="r2">2 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3months" id="r3" variant="dot" />
                  <Label htmlFor="r3">3 months</Label>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4months" id="r4" variant="dot" />
                  <Label htmlFor="r4">4 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5months" id="r5" variant="dot" />
                  <Label htmlFor="r5">5 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6months" id="r6" variant="dot" />
                  <Label htmlFor="r6">6 months</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline1"
              className="w-full"
              onClick={() => {
                setShowMainDialog(false);
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="paginationActive"
                  className="w-full rounded-md"
                >
                  Extend
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]" variant="default">
                <img
                  src="/assets/images/extended.png"
                  alt="Extended image"
                  className="flex items-center justify-center w-full"
                />
                <div className="">
                  <p className="text-base text-center font-medium">
                    The next payment date for this subscription has been
                    successfully extended by {getMonthsNumber(selectedMonths)}{" "}
                    month
                    {getMonthsNumber(selectedMonths) > 1 ? "s" : ""}. The new
                    payment date has been set to{" "}
                    <span className="font-semibold">
                      ({calculateNewExpiryDate()})
                    </span>{" "}
                    . The user will continue to have uninterrupted access to the
                    service until the new payment date.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="paginationActive"
                    className="w-full rounded-md"
                    onClick={handleConfirm}
                  >
                    Continue
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

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
