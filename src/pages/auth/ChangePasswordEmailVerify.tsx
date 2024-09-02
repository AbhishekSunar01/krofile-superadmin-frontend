import { useState } from "react";
import { Link } from "react-router-dom";
import EmailVerify from "../../components/login/EmailVerify";
import { Button } from "../../components/ui/button";
import CommonAuthLayout from "../../layout/CommonAuthLayout";

import SuccessGif from "../../assets/png/Login Images/resetpasswordsuccess.gif";
import { cn } from "../../lib/utils";

export default function ChangePasswordEmailVerify() {
  const [verified, setVerified] = useState(false);
  return (
    <>
      {verified === false ? (
        <CommonAuthLayout
          backLink={"/auth/change-password"}
          title={"Almost there! Enter the code to proceed"}
          subTitle={
            '"A 6-digit code has just been sent to johndoe@gmail.com. Enter it below to proceed"'
          }
        >
          <EmailVerify setVerified={setVerified} verificationCode="123456" />
        </CommonAuthLayout>
      ) : (
        <div className="mx-auto w-[480px] h-auto flex flex-col gap-[24px] mt-[8%]">
          <div className="heading flex flex-col gap-[12px]">
            <div className="text-center text-[28px] font-semibold leading-[33.6px] text-[#14181f]">
              Password Change Successful
            </div>
            <div className="text-[14px] font-normal text-[#14181f] text-center">
              You’re all set! Your password is changed successfully
            </div>
          </div>
          <img
            src={SuccessGif}
            className="mx-auto h-[300px] w-[300px]"
            alt="Success gif"
          />

          <Link to={"/auth/login"} className="button w-full mx-auto">
            <Button
              //   disabled={loading}
              type="submit"
              size={"login"}
              variant={"login"}
              className={cn(
                "flex justify-center items-center gap-4 cursor-pointer w-full"
              )}
            >
              Continue
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
