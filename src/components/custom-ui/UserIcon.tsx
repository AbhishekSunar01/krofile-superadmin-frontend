import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserIcon() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar className="rounded-xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-base font-semibold">Santosh Phaiju</div>
      </div>
    </div>
  );
}
