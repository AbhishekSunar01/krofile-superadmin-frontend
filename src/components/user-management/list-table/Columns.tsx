import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import block from "../../../assets/svg/block.svg";
import reactivate from "../../../assets/svg/reactivate.svg";
import manage from "../../../assets/svg/setting.svg";
import suspend from "../../../assets/svg/suspend.svg";
import unblock from "../../../assets/svg/unblock.svg";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { BusinessData, ColumnDefinition } from "../../../types/type";

const ActionCell: React.FC = () => {
  const [isSuspended, setIsSuspended] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [suspensionDays, setSuspensionDays] = useState<number | undefined>();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSuspendConfirm = () => {
    if (suspensionDays !== null && suspensionDays !== undefined) {
      if (suspensionDays > 0) {
        setIsSuspended(true);
        setSuspendDialogOpen(false);
        setDropdownOpen(false);
      } else if (suspensionDays === 0) {
        alert("Please enter a valid number of days");
      }
    } else {
      alert("Please enter a valid number of days");
    }
  };

  const handleReactivateConfirm = () => {
    setIsSuspended(false);
    setSuspendDialogOpen(false);
    setDropdownOpen(false);
  };

  const handleBlockConfirm = () => {
    setIsBlocked(true);
    setBlockDialogOpen(false);
    setDropdownOpen(false);
  };

  const handleUnblockConfirm = () => {
    setIsBlocked(false);
    setBlockDialogOpen(false);
    setDropdownOpen(false);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 cursor-pointer"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-1">
          <img src={manage} alt="manage" />
          Manage Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
          <DialogTrigger
            onClick={(event) => event.stopPropagation()}
            className={`gap-1 flex text-sm p-2 ${
              isSuspended ? "text-accentGreen" : "text-accentOrange"
            }`}
          >
            <img
              src={isSuspended ? reactivate : suspend}
              alt={isSuspended ? "reactivate" : "suspend"}
              className="h-[22px] w-[22px]"
            />
            {isSuspended ? "Re-Activate" : "Suspend"}
          </DialogTrigger>
          <DialogContent
            className="flex flex-col items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSuspended ? (
              <>
                <div className="flex items-center justify-center w-20 h-20 bg-accentOrange/20 rounded-full">
                  <img
                    src={suspend}
                    alt="suspend"
                    className="h-[54px] w-[54px]"
                  />
                </div>
                <h1 className="text-2xl font-semibold -mb-8">Suspend User?</h1>
                <p className="text-center">
                  Suspend this user to ensure compliance with our policies
                </p>
                <div className="w-full -mt-1">
                  <h3 className=" text-base font-medium mb-[2px]">
                    Suspension Days <span className="text-desctructive">*</span>
                  </h3>
                  <Input
                    type="number"
                    placeholder="Enter the suspension day"
                    className="w-full"
                    required
                    min={1}
                    value={suspensionDays}
                    onChange={(e) => setSuspensionDays(Number(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between w-full gap-4 ">
                  <Button
                    variant="outline1"
                    className="w-full"
                    onClick={() => setSuspendDialogOpen(false)}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    variant="destructive"
                    className="w-full "
                    onClick={handleSuspendConfirm}
                  >
                    Yes, Confirm
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-20 h-20 bg-[#00A81C]/20 rounded-full">
                  <img
                    src={reactivate}
                    alt="reactivate"
                    className="h-[54px] w-[54px]"
                  />
                </div>
                <h1 className="text-2xl font-semibold -mb-6">
                  Re-Activate User?
                </h1>
                <p className="text-center">
                  Quickly restore user access with a single click
                </p>
                <div className="w-full gap-4 ">
                  <Button
                    variant="success"
                    className="w-full mb-4"
                    onClick={handleReactivateConfirm}
                  >
                    Yes, Confirm
                  </Button>
                  <Button
                    variant="outline1"
                    className="w-full"
                    onClick={() => setSuspendDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
          <DialogTrigger
            onClick={(event) => event.stopPropagation()}
            className={`gap-1 flex text-sm p-2 ${
              isBlocked ? "text-accentGreen" : "text-[#DF0C3D]"
            }`}
          >
            <img
              src={isBlocked ? unblock : block}
              alt={isBlocked ? "unblock" : "block"}
              className="h-[22px] w-[22px]"
            />
            {isBlocked ? "Unblock" : "Block"}
          </DialogTrigger>
          <DialogContent
            className="flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {!isBlocked ? (
              <>
                <div className="flex items-center justify-center w-20 h-20 bg-[#DF0C3D]/20 rounded-full">
                  <img src={block} alt="block" className="h-[54px] w-[54px]" />
                </div>
                <h1 className="text-2xl font-semibold -mb-6">Block User?</h1>
                <p className="text-center">
                  Terminate this user's access to all Krofile's features and
                  services
                </p>
                <div className="w-full gap-4 ">
                  <Button
                    variant="destructive"
                    className="w-full mb-4"
                    onClick={handleBlockConfirm}
                  >
                    Yes, Confirm
                  </Button>
                  <Button
                    variant="outline1"
                    className="w-full"
                    onClick={() => setBlockDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-20 h-20 bg-[#00A81C]/20 rounded-full">
                  <img
                    src={unblock}
                    alt="unblock"
                    className="h-[54px] w-[54px]"
                  />
                </div>
                <h1 className="text-2xl font-semibold -mb-6">Unblock User?</h1>
                <p className="text-center">Reinstate user access in seconds</p>
                <div className="w-full gap-4 ">
                  <Button
                    variant="success"
                    className="w-full mb-4"
                    onClick={handleUnblockConfirm}
                  >
                    Yes, Confirm
                  </Button>
                  <Button
                    variant="outline1"
                    className="w-full"
                    onClick={() => setBlockDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;

export const Columns: ColumnDefinition<BusinessData>[] = [
  {
    id: "id",
    header: "S.N.",
    accessorKey: "_id",
    sortable: false,
    searchable: true,
    filterable: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {String(row.index + 1).padStart(2, "0")}
        </div>
      );
    },
  },
  {
    id: "businessName",
    header: "Business Name",
    accessorKey: "businessName",
    sortable: true,
    searchable: true,
    filterable: false,
    cell: ({ row }) => (
      <Button variant="ghost">{row.getValue("businessName")}</Button>
    ),
  },
  {
    id: "industryType",
    header: "Industry Type",
    accessorKey: "industryType",
    sortable: false,
    searchable: true,
    filterable: true,
  },
  {
    id: "subStatus",
    header: "Subs. Status",
    accessorKey: "subStatus",
    sortable: false,
    searchable: true,
    filterable: true,
  },
  {
    id: "plan",
    header: "Plan",
    accessorKey: "plan",
    sortable: false,
    searchable: true,
    filterable: true,
  },
  {
    id: "regDate",
    header: "Reg. Date",
    accessorKey: "regDate",
    sortable: true,
    searchable: true,
    cell: ({ row }) => (
      <Button variant="ghost">
        {new Date(row.original.regDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}
      </Button>
    ),
  },
  {
    id: "country",
    header: "Country",
    accessorKey: "country",
    sortable: true,
    searchable: true,
    filterable: false,
    cell: ({ row }) => (
      <Button variant="ghost">{row.getValue("country")}</Button>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => <ActionCell />,
    accessorKey: "_id",
  },
];
