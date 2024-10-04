import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

import SuccessGif from "../../assets/png/Login Images/resetpasswordsuccess.gif";
import { cn } from "../../lib/utils";

export default function ChangePasswordSuccess() {
  return (
    <>
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
    </>
  );
}
