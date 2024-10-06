import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Loader2, TriangleAlert } from "lucide-react";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
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
import {
  useResendForgetPasswordOtp,
  useResendTwoFaOtp,
  useResetPasswordVerifyOtp,
  useVerifyTwoFaOtp,
} from "../../services/mutations/authMutation";
import useAuthStore from "../../store/authStore";
import { OtpSchema } from "../../utils/schemas/authSchema";

interface IProps {
  setVerified?: Dispatch<boolean>;
  redirectLink?: string;
  type: "ResetPassword" | "TwoFa";
}

const EmailVerify = ({ setVerified, redirectLink, type }: IProps) => {
  const [reset, setReset] = useState(false);
  const [time, setTime] = useState({
    minutes: 2,
    seconds: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const nav = useNavigate();
  const verifyTwoFaOtp = useVerifyTwoFaOtp();
  const resendTwoFaOtp = useResendTwoFaOtp();

  const resetPasswordVerifyOtpService = useResetPasswordVerifyOtp();
  const resendForgetPasswordOtpService = useResendForgetPasswordOtp();

  const setTokens = useAuthStore((state) => state.setTokens);

  useEffect(() => {
    if (reset === true) {
      setTime({
        minutes: 2,
        seconds: 0,
      });
    }
  }, [reset]);

  const handleResend = async () => {
    setResetLoading(true);
    setReset(false);
    if (type === "TwoFa") {
      try {
        const responseData = await resendTwoFaOtp.mutateAsync({
          email: localStorage.getItem("email") || "",
        });
        if (responseData.status === "success") {
          setReset(true);
          setErrorMessage("");
          toast.success(responseData.data.message);
        }
        setResetLoading(false);
      } catch (error) {
        setReset(false);
        setResetLoading(false);
        console.log("error in resendTwoFaOtp", error);
      }
    }
    if (type === "ResetPassword") {
      try {
        const responseData = await resendForgetPasswordOtpService.mutateAsync({
          email: localStorage.getItem("reset-email") || "",
        });
        if (responseData.status === "success") {
          setReset(true);
          setErrorMessage("");
          toast.success(responseData.data.message);
        }
        setResetLoading(false);
      } catch (error) {
        setReset(false);
        setResetLoading(false);
        console.log("error in resendForgetPasswordOtpService", error);
      }
    }
  };

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof OtpSchema>) {
    setLoading(true);
    if (time.minutes === 0 && time.seconds === 0) {
      setLoading(false);
      setErrorMessage("Invalid or expired reset code. Please try again.");
    } else {
      if (type === "TwoFa") {
        try {
          const responseData = await verifyTwoFaOtp.mutateAsync({
            otp: data.pin,
          });

          if (responseData.status === "success") {
            setLoading(false);
            setErrorMessage("");
            toast.success("You have been successfully verified and logged in.");
            setTokens(
              responseData.data.token.access_token,
              responseData.data.token.refresh_token
            );
            if (setVerified) {
              setVerified(true);
            }
            setErrorMessage("");
            if (redirectLink) {
              return nav(redirectLink);
            }
            localStorage.removeItem("temporary_token");
            localStorage.removeItem("email");
            return nav("/dashboard");
          }
        } catch (error) {
          setLoading(false);
          setErrorMessage("Invalid or expired reset code. Please try again.");
          console.log("error in verifyTwoFaOtp", error);
        }
      }

      if (type === "ResetPassword") {
        try {
          const responseData = await resetPasswordVerifyOtpService.mutateAsync({
            otp: data.pin,
          });

          if (responseData.status === "success") {
            setLoading(false);
            setErrorMessage("");
            toast.success(responseData.data.message);
            nav("/auth/set-new-password");
          }
        } catch (error) {
          setLoading(false);
          setErrorMessage("Invalid or expired reset code. Please try again.");
          console.log("error in verifyResetPasswordOtp", error);
        }
      }
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[24px]">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="mb-[24px]">
                <FormLabel className="text-[16px]">Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
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

          <div className="text-destructive text-[14px] font-normal text-center">
            Time Remaining: <CountdownTimer time={time} setTime={setTime} /> sec
          </div>

          <div className="button my-[32px]">
            <Button
              disabled={loading}
              size={"login"}
              variant={"login"}
              type="submit"
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
          <div className="text-center text-[14px] font-[400] flex gap-1 w-full justify-center items-center">
            If you didn’t receive a code!{" "}
            <Button
              disabled={
                resetLoading || time.minutes !== 0 || time.seconds !== 0
              } // Disable button when timer is running
              variant={"ghost"}
              className={clsx(
                "text-destructive font-[400] px-0 cursor-pointer",
                {
                  "cursor-not-allowed":
                    resetLoading || time.minutes !== 0 || time.seconds !== 0,
                }
              )}
              onClick={handleResend}
            >
              Resend
            </Button>
            <div>
              {resetLoading && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailVerify;
