import { ChevronDown, Eye, Lock, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import BuildingImage from "../../assets/svg/building.svg";
import DeleteImage from "../../assets/svg/deleteimage.svg";
import ImageAdd from "../../assets/svg/imageadd.svg";
import UserProfileImage from "../../assets/svg/userprofile.svg";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
                          Edit details
                        </DialogTitle>
                        <div className="text-[18px] leading-5 text-secondary-foreground font-[500]">
                          Edit Details
                        </div>
                        <div className="text-[#525E6F] font-[400] text-[14px]">
                          Edit and Save Your Details
                        </div>
                      </div>
                    </div>
                  </DialogHeader>
                  <hr />
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lastPasswordChanged">Image</Label>
                      <div className="h-auto flex justify-between items-center border px-[14px] py-[10px] rounded-[8px] ">
                        <div className="flex items-center justify-start gap-2">
                          <img
                            className="h-[40px] w-[40px]"
                            src={UserProfileImage}
                            alt="image of the user"
                          />
                          <div className="font-[500] text-[16px]">
                            Santosh Phaiju
                          </div>
                        </div>
                        <div className="flex icons justify-center items-center gap-2">
                          <label htmlFor="userImage">
                            <img
                              className="h-[24px] w-[24px] cursor-pointer"
                              src={ImageAdd}
                              alt="image of the user"
                            />
                          </label>
                          <input
                            type="file"
                            id="userImage"
                            name="userImage"
                            className="hidden"
                          />
                          <img
                            src={DeleteImage}
                            alt="delete image"
                            className="h-[24px] w-[24px] cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        defaultValue={"Santosh Phaiju"}
                        type="text"
                        placeholder="Username"
                        className="h-[45px]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        defaultValue={"santoshphaiju@gmail.com"}
                        type="email"
                        placeholder="Email"
                        className="h-[45px]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        onValueChange={() => console.log("hi")}
                        defaultValue="admin"
                      >
                        <SelectTrigger
                          id="role"
                          name="role"
                          className="w-full h-[40px] py-[22px]"
                        >
                          <SelectValue placeholder="Choose Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Choose Role</SelectLabel>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <hr />
                  <DialogFooter>
                    <div className="flex justify-between w-full gap-2">
                      <DialogClose asChild>
                        <Button
                          className="w-[50%]"
                          variant={"outline"}
                          size={"lg"}
                          type="submit"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button className="w-[50%]" type="submit" size={"lg"}>
                          Update & Save
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div>
                <Link
                  className={cn(
                    "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 hover:bg-gray-100 cursor-pointer  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                  to="/auth/change-password" // need to create change password page...
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
