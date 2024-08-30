import { ChevronDown, Eye, Lock, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserIcon() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center items-center gap-2">
              <Avatar className="rounded-xl select-none">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex text-base font-semibold text-primary select-none cursor-pointer justify-center items-center gap-1">
                Santosh Phaiju <ChevronDown />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
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
                    <span>Edit Details</span>
                  </div>
                </DialogTrigger>
                {/* <DialogContent className="sm:max-w-[650px]">
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
                </DialogContent> */}
              </Dialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div>
                <Link
                  className={cn(
                    "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 hover:bg-gray-100 cursor-pointer  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                  to="/auth/reset-password" // need to create change password page...
                >
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </Link>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                to="/auth/login"
                className={cn(
                  "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 hover:bg-gray-100 cursor-pointer  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                )}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
