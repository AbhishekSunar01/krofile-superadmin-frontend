import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import BuildingImage from "../../assets/svg/building.svg";
import DeleteImage from "../../assets/svg/delete.png";
import UserProfileImage from "../../assets/svg/userprofile.svg";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { Row } from "@tanstack/react-table";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { settingsDataType } from "./columns";

export const ActionComponent = ({ row }: { row: Row<settingsDataType> }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-[52px] h-[20px]">
            <EllipsisVertical className="w-full h-full cursor-pointer" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <Dialog>
              <DialogTrigger
                onClick={(event) => event.stopPropagation()}
                asChild
              >
                <div
                  className={cn(
                    "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 hover:bg-gray-100 cursor-pointer  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View Details</span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                  <div className="flex gap-4 items-center">
                    <div className="flex h-[48px] w-[48px] p-[12px] border rounded-[10px] justify-center items-center">
                      <img
                        className=""
                        src={BuildingImage}
                        alt="building image"
                      />
                    </div>
                    <div>
                      <DialogTitle className="hidden">
                        View details
                      </DialogTitle>
                        <div className="text-[18px] leading-5 text-secondary-foreground font-[500]">
                          View Details
                        </div>
                        <div className="text-[#525E6F] font-[400] text-[14px]">
                          Details of User
                        </div>
                    </div>
                  </div>
                </DialogHeader>
                <hr />
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      readOnly={true}
                      disabled
                      value={row.original.name}
                      type="text"
                      placeholder="username"
                      className="h-[45px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      readOnly={true}
                      disabled
                      value={row.original.email}
                      type="email"
                      placeholder="Email"
                      className="h-[45px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastPasswordChanged">
                      Last Password Changed
                    </Label>
                    <Input
                      readOnly={true}
                      disabled
                      value={row.original.lastPasswordChange}
                      type="text"
                      placeholder="lastPasswordChanged"
                      className="h-[45px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      readOnly={true}
                      disabled
                      value={row.original.role}
                      type="text"
                      placeholder="role"
                      className="h-[45px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastPasswordChanged">Image</Label>
                    <div className="h-auto border px-[14px] py-[10px] rounded-[8px] ">
                      <img src={UserProfileImage} alt="image of the user" />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Dialog>
              <DialogTrigger
                onClick={(event) => event.stopPropagation()}
                asChild
              >
                <div
                  className={cn(
                    "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 hover:bg-gray-100 cursor-pointer  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </div>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[500px] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                  <img src={DeleteImage} alt="delete image" className="" />
                </div>
                <h1 className="text-2xl font-semibold -mb-6">Delete User?</h1>
                <p className="text-center">
                  This user will be no longer part of Krofile
                </p>
                <div className="w-full gap-4 ">
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="w-full mb-4 rounded-[8px]"
                      size={"lg"}
                      // onClick={handleBlockConfirm}
                    >
                      Yes, Confirm
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="w-full rounded-[8px]"
                      size={"lg"}
                      // onClick={() => setBlockDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
