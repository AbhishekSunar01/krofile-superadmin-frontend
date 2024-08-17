import { Link } from "react-router-dom";
import MailImage from "../assets/png/Login Images/MailImage.svg";
import BackButton from "../components/custom-ui/BackButton";

interface IProps {
  children: React.ReactNode;
  backLink: string;
  title: string;
  subTitle: string;
  mailImage?: boolean;
}

const CommonAuthLayout = ({
  children,
  backLink,
  title,
  subTitle,
  mailImage = true,
}: IProps) => {
  return (
    <>
      <div className="mx-auto w-[480px] h-auto">
        <Link to={backLink} className="mb-[48px]">
          <BackButton />
        </Link>

        <div className="flex mt-[24px] flex-col gap-[24px] w-full">
          <div className="heading flex flex-col gap-[12px]">
            {mailImage && (
              <img
                src={MailImage}
                className="mx-auto h-[98px] w-[98px]"
                alt="mail image"
              />
            )}
            <div className="text-center text-[28px] font-semibold leading-[33.6px]">
              {title}
            </div>
            <div className="text-[14px] font-normal text-center">
              {subTitle}
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default CommonAuthLayout;
