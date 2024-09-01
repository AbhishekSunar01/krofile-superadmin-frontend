import { DialogClose } from "@radix-ui/react-dialog";
import BuildingImage from "../assets/svg/building.svg";
import SettingsTable from "../components/settings/SettingsTable";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import PageLayout from "../layout/PageLayout";

export default function Settings() {
  return (
    <PageLayout
      title="Settings"
      description="Effortlessly manage your super admin team. Invite support members to oversee the panel, track business progress, and access detailed insights for smooth operations."
    >
      <div className="flex pageHeading justify-between items-center mb-[24px]">
        <div className="text-[22px] font-[500] font-inter">
          Team Directory: Krofile Super Admin Members
        </div>

        <Dialog>
          <DialogTrigger onClick={(event) => event.stopPropagation()} asChild>
            <Button
              variant={"default"}
              className="px-[32px] text-[16px] rounded-[12px] h-[48px]"
            >
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <div className="flex gap-4 items-center">
                <div className="flex h-[48px] w-[48px] p-[12px] border rounded-[10px] justify-center items-center">
                  <img className="" src={BuildingImage} alt="building image" />
                </div>
                <div>
                  <DialogTitle className="hidden">Add New User</DialogTitle>
                  <div className="text-[18px] leading-5 text-secondary-foreground font-[500]">
                    Add New User
                  </div>
                  <div className="text-[#525E6F] font-[400] text-[14px]">
                    Strengthen Your Workforce: Quick User Addition
                  </div>
                </div>
              </div>
            </DialogHeader>
            <hr />
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  // value={row.original.name}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="e.g. Desired Username"
                  className="h-[45px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. example@gmail.com"
                  className="h-[45px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
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
                    Confirm
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <SettingsTable />
    </PageLayout>
  );
}
