import GrowthIndicator from "../../assets/svg/growthindicator.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface IReportCardProps {
  cardTitle: string;
  total?: string | number;
  growthPercentage?: string;
  childrenComponent?: React.ReactNode;
}

const EagleViewCard = ({
  cardTitle,
  total,
  growthPercentage,
  childrenComponent,
}: IReportCardProps) => {
  return (
    <>
      <Card className="border col-span-2 h-[470px] select-none">
        <CardHeader>
          <CardTitle className="font-[400] font-inter text-[16px] flex justify-between items-center text-[#14181F] ">
            <div>{cardTitle}</div>
          </CardTitle>
          <CardDescription className="flex select-none justify-start items-center gap-[2px]">
            <span className="text-[28px] text-[#14181F] font-inter font-[600]">
              {total}&nbsp;
            </span>
            <img
              src={GrowthIndicator}
              alt="Growth Indicator"
              className="inline-block"
            />
            <span className="text-[#14181F] text-[12px] font-[500] justify-center items-center inline-block">
              {growthPercentage !== undefined ? growthPercentage : 0}%&nbsp;
            </span>
            <span className="text-[#1E7BC8] text-[12px] font-[400]">
              vs previous period&nbsp;
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>{childrenComponent}</CardContent>
      </Card>
    </>
  );
};

export default EagleViewCard;
