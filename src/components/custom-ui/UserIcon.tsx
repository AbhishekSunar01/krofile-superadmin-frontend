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

import useAuthStore from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  useRemoveAvatar,
  useUserUpdate,
} from "../../services/mutations/userMutation";
import { IRemoveUserAvatarData, IUpdatedUserData } from "../../types/authTypes";

export default function UserIcon() {
  const { userData, setLoggedInUserData } = useUserStore();
  const logout = useAuthStore((state) => state.logout);

  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // State to hold the preview URL
  const [updatedName, setUpdatedName] = useState<string | undefined>(
    userData?.name
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync } = useUserUpdate();
  const removeAvatar = useRemoveAvatar();

  // 2. Define a submit handler.
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    if (updatedName) {
      formData.append("name", updatedName);
    }

    // 3. Call the mutation function with the form data.
    const data: IUpdatedUserData = await mutateAsync({ formData });

    if (data.status === "success") {
      toast.success("Your details have been updated successfully");
      setLoggedInUserData(data.user);
      setIsDialogOpen(false);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center items-center gap-2">
              <Avatar className="rounded-xl select-none">
                <AvatarImage
                  src={
                    userData.avatar !== undefined
                      ? userData.avatar
                      : "https://github.com/shadcn.png"
                  }
                  className="border rounded-full object-cover object-top bg-white"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex text-base font-semibold text-primary select-none cursor-pointer justify-center items-center gap-1">
                {userData.name ?? "Santosh Phaiju"} <ChevronDown />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuGroup>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

                  <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="image">Image</Label>
                        <div className="h-auto flex justify-between items-center border px-[14px] py-[10px] rounded-[8px] ">
                          <div className="flex items-center justify-start gap-2">
                            {avatarPreview === null && (
                              <img
                                className="h-[40px] w-[40px] rounded-full object-cover object-top bg-white border"
                                src={
                                  userData.avatar !== undefined
                                    ? userData.avatar
                                    : UserProfileImage
                                }
                                alt="image of the user"
                              />
                            )}
                            {avatarPreview && (
                              <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="h-[40px] w-[40px] rounded-full object-cover object-top bg-white border"
                              />
                            )}
                            <div className="font-[500] text-[16px]">
                              {userData.name ?? "Santosh Phaiju"}
                            </div>
                          </div>
                          <div className="flex icons justify-center items-center gap-2">
                            <Label htmlFor="userImage">
                              <img
                                className="h-[24px] w-[24px] cursor-pointer"
                                src={ImageAdd}
                                alt="image of the user"
                              />
                            </Label>
                            <div>
                              <Input
                                type="file"
                                id="userImage"
                                name="avatar"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setAvatarPreview(URL.createObjectURL(file));
                                  }
                                  setAvatarFile(e.target.files?.[0]);
                                }}
                              />
                            </div>

                            <img
                              src={DeleteImage}
                              alt="delete image"
                              className="h-[24px] w-[24px] cursor-pointer"
                              onClick={async () => {
                                const data: IRemoveUserAvatarData =
                                  await removeAvatar.mutateAsync();
                                if (data.status === "success") {
                                  toast.success(
                                    "Your avatar has been removed successfully"
                                  );
                                  setIsDialogOpen(false);
                                  setLoggedInUserData(data.user);
                                  setAvatarPreview(null);
                                  setAvatarFile(undefined);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="username">Username</Label>
                        <div>
                          <Input
                            name="name"
                            id="name"
                            value={updatedName}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const target = e.target as HTMLInputElement;
                              setUpdatedName(target.value);
                            }}
                            className="h-[45px]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          defaultValue={userData?.email}
                          type="email"
                          placeholder="Email"
                          className="h-[45px] text-gray-500 select-none cursor-not-allowed"
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          defaultValue={userData?.role.toLowerCase()}
                          type="text"
                          className="h-[45px] select-none text-gray-500 cursor-not-allowed"
                          readOnly
                        />
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
                          >
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button className="w-[50%]" size={"lg"}>
                          Update & Save
                        </Button>
                      </div>
                    </DialogFooter>
                  </form>
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
                onClick={() => {
                  // Cookies.remove("accessToken");
                  // Cookies.remove("refreshToken");
                  // clearLoggedInUserData();
                  // localStorage.clear();
                  logout();
                }}
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
