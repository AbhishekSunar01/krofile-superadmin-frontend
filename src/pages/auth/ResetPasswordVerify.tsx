import CommonAuthLayout from "../../layout/CommonAuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { OtpSchema } from "../../utils/schemas/authSchema";

export default function ResetPasswordVerify() {
  const [reset, setReset] = useState(false);
  const [time, setTime] = useState({
    minutes: 2,
    seconds: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
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
      if (data.pin === "123456") {
        setTimeout(() => {
          setLoading(false);
          nav("/auth/set-new-password");
          setErrorMessage("");
        }, 2000);
      } else {
        setLoading(false);
        setErrorMessage("Invalid or expired reset code. Please try again.");
      }
    }
  }

  return (
    <CommonAuthLayout
      backLink={"/auth/reset-password"}
      title={"Reset Password"}
      subTitle={
        '"A 5-digit code has just been sent to admin@gmail.com. Enter it below to proceed"'
      }
    >
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
    </CommonAuthLayout>
  );
}
