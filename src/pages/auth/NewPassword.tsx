import { useState } from "react";
import { Link } from "react-router-dom";
import SuccessGif from "../../assets/png/Login Images/resetpasswordsuccess.gif";
import CommonAuthLayout from "../../layout/CommonAuthLayout";
import { Button } from "../../components/ui/button";
import { NewPasswordForm } from "../../components/login";
import { cn } from "../../lib/utils";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";

export default function NewPassword() {
  useRedirectIfLoggedIn();
  const [verified, setVerified] = useState(false);
  //   const [loading, setLoading] = useState(false);

  return (
    <>
      <CommonAuthLayout
        backLink={"/auth/reset-password-verify-email"}
        title={
          verified === false
            ? "Set Your New Password"
            : "Your password was successfully updated!"
        }
        subTitle={
          verified === false
            ? "Enhance your security."
            : "Only one click to explore Krofile Super Admin"
        }
        mailImage={false}
      >
        {verified === false ? (
          <NewPasswordForm setVerified={setVerified} />
        ) : (
          <>
            <div className="mx-auto w-[480px] h-auto flex flex-col gap-[24px]">
              {/* <div className="heading flex flex-col gap-[12px]">
                <div className="text-center text-[28px] font-semibold leading-[33.6px] text-[#14181f]">
                  Your password was successfully updated!
                </div>
                <div className="text-[14px] font-normal text-[#14181f] text-center">
                  Only one click to explore Krofile Super Admin
                </div>
              </div> */}
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
                    // {
                    //   "cursor-not-allowed": loading,
                    // }
                  )}
                >
                  Continue
                  {/* {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />} */}
                </Button>
              </Link>
            </div>
          </>
        )}
      </CommonAuthLayout>
    </>
  );
}
