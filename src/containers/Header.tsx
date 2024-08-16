export default function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-[109px] bg-card flex flex-col items-start justify-center px-8 z-10">
      <div className="text-[28px] font-semibold w-full flex justify-between">
        {title}
      </div>
      <div className="muted text-base w-fit">{description}</div>
    </div>
  );
}
