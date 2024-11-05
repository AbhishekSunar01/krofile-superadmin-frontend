import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";
import CommonAuthLayout from "../../layout/CommonAuthLayout";
import { cn } from "../../lib/utils";
import { useForgetPassword } from "../../services/mutations/authMutation";
import { ResetPasswordSchema } from "../../utils/schemas/authSchema";

export default function ResetPassword() {
  useRedirectIfLoggedIn();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
  const forgetPasswordService = useForgetPassword();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    setLoading(true);

    try {
      const responseData = await forgetPasswordService.mutateAsync({
        email: values.email,
      });
      if (responseData.status && responseData.status === "success") {
        setLoading(false);
        toast.success(responseData.data.message);
        localStorage.setItem("reset-email", values.email);
        nav("/auth/reset-password-verify-email");
        setErrorMessage("");
      }
    } catch (error: unknown) {
      setLoading(false);
      setErrorMessage("");
      console.log("error in reset password", error);
    }

    // redirect("/auth/2fa");
  }

  return (
    <CommonAuthLayout
      backLink={"/auth/login"}
      title={"Reset Password"}
      subTitle={
        "Securely regain access to your account and continue managing your business effortlessly."
      }
    >
      <div className="form">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[24px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-[500]">
                    Email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-[12px] bg-white h-[48px] border border-[#b6c1ca] py-[4px] px-[12px]"
                      placeholder="Enter your email here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="text-[12px] text-desctructive -mt-[18px]"
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              disabled={loading}
              type="submit"
              size={"login"}
              variant={"login"}
              className={cn(
                "flex justify-center items-center gap-4 cursor-pointer",
                {
                  "cursor-not-allowed": loading,
                }
              )}
            >
              Send
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </CommonAuthLayout>
  );
}
