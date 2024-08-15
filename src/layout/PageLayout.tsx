import { Card } from "../components/ui/card";

export default function PageLayout(props: {
  children: React.ReactNode;
  header: string;
  description: string;
}) {
  const { children, header, description } = props;
  return (
    <div>
      <div className="h-[110px] w-full border-b bg-card flex flex-col items-start justify-center px-8 fixed">
        <div className="text-[28px] font-semibold w-full flex justify-between">
          {header}
          <div>
            <Card className="bg-[#F6F7F9]"></Card>
          </div>
        </div>
        <div className="muted text-base">{description}</div>
      </div>

      <div className="p-8 mt-[110px]">{children}</div>
    </div>
  );
}
