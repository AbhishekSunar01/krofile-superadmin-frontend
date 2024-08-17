import CommonAuthLayout from "../../layout/CommonAuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import { cn } from "../../lib/utils";
import { ResetPasswordSchema } from "../../utils/schemas/authSchema";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    setLoading(true);

    if (values.email !== "admin@gmail.com") {
      setLoading(false);
      setErrorMessage(
        "Oops! The email you entered is incorrect. Please try again."
      );
      toast.error(
        "Oops! The email you entered is incorrect. Please try again."
      );
    } else {
      // Simulate a login request.
      setTimeout(() => {
        // toast.success("You are successfully logged in!");

        setLoading(false);
        setErrorMessage("");
        return nav("/auth/reset-password-verify-email");
        // redirect("/auth/2fa");
      }, 2000);
    }
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
