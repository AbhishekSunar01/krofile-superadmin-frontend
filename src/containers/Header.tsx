import NotificationBell from "../components/custom-ui/NotificationBell";
import UserIcon from "../components/custom-ui/UserIcon";

export default function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-[109px] bg-card flex flex-col items-start justify-center px-8 z-10">
      <div className="text-[28px] font-semibold w-full flex justify-between items-center">
        {title}

        <div className="flex items-center justify-center gap-4">
          <NotificationBell />
          <UserIcon />
        </div>
      </div>

      <div className="muted text-base w-fit leading-5">{description}</div>
    </div>
  );
}
