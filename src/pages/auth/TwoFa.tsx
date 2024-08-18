import SuccessGif from "../../assets/png/Login Images/fasuccess.gif";
import MailImage from "../../assets/png/Login Images/MailImage.svg";
import BackButton from "../../components/custom-ui/BackButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CountdownTimer from "../../components/custom-ui/PasswordVerifyTimer";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { cn } from "../../lib/utils";
import { OtpSchema } from "../../utils/schemas/authSchema";

const TwoFAPage = () => {
  const [reset, setReset] = useState(false);
  const [time, setTime] = useState({
    minutes: 2,
    seconds: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reset === true) {
      setTime({
        minutes: 2,
        seconds: 0,
      });
    }
  }, [reset]);

  const handleResend = () => {
    setReset(true);
  };

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof OtpSchema>) {
    setLoading(true);
    if (time.minutes === 0 && time.seconds === 0) {
      setLoading(false);
      setErrorMessage("Invalid or expired reset code. Please try again.");
    } else {
      if (data.pin === "12345") {
        setTimeout(() => {
          setLoading(false);
          setErrorMessage("");
          setVerified(true);
          toast.success("You are successfully verified!");
        }, 2000);
      } else {
        setLoading(false);
        setErrorMessage("Invalid or expired reset code. Please try again.");
      }
    }
  }

  return (
    <div className="flex justify-center min-h-[84vh] items-center">
      {verified === false ? (
        <div className="mx-auto w-[480px] h-auto">
          <Link to={"/auth/login"} className="mb-[48px]">
            <BackButton />
          </Link>

          <div className="heading flex flex-col gap-[12px]">
            <img
              src={MailImage}
              className="mx-auto h-[98px] w-[98px]"
              alt="mail image"
            />
            <div className="text-center text-[28px] font-semibold leading-[33.6px]">
              Almost there! Enter the 2FA code to proceed.
            </div>
            <div className="text-[14px] text-center">
              "A 5-digit code has just been sent to admin@gmail.com. Enter it
              below to proceed"
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[24px]">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="mb-[24px]">
                    <FormLabel className="text-[16px]">Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={5} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMessage && (
                <div className="text-[14px] font-[500] text-center mb-[24px] bg-[#DF0C3D33] p-[8px] rounded-[8px] flex justify-center items-center gap-2">
                  <TriangleAlert />
                  {errorMessage}
                </div>
              )}

              <div className="text-destructive tet-[14px] font-normal text-center">
                Time Remaining: <CountdownTimer time={time} setTime={setTime} />{" "}
                sec
              </div>

              <div className="button my-[32px]">
                <Button
                  disabled={loading}
                  type="submit"
                  size={"login"}
                  variant={"login"}
                  className={cn(
                    "flex justify-center items-center gap-4 cursor-pointer w-full",
                    {
                      "cursor-not-allowed": loading,
                    }
                  )}
                >
                  Verify Email
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                </Button>
              </div>
              <div className="text-center text-[14px] font-[400]">
                If you didn’t receive a code!{" "}
                <span
                  className="text-destructive cursor-pointer font-[400]"
                  onClick={handleResend}
                >
                  Resend
                </span>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="mx-auto w-[480px] h-auto flex flex-col gap-[24px]">
          <div className="heading flex flex-col gap-[12px]">
            <div className="text-center text-[28px] font-semibold leading-[33.6px]">
              Verification Successful
            </div>
            <div className="text-[14px] font-normal text-center">
              You’re all set! Your account access is confirmed
            </div>
          </div>
          <img
            src={SuccessGif}
            className="mx-auto h-[300px] w-[300px]"
            alt="Success gif"
          />

          <Link to={"/dashboard"} className="button w-full mx-auto">
            <Button
              disabled={loading}
              type="submit"
              size={"login"}
              variant={"login"}
              className={cn(
                "flex justify-center items-center gap-4 cursor-pointer w-full",
                {
                  "cursor-not-allowed": loading,
                }
              )}
            >
              Continue
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TwoFAPage;
