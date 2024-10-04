import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
import { cn } from "../../lib/utils";
import { useChangePassword } from "../../services/mutations/authMutation";
import useAuthStore from "../../store/authStore";
import { ChangePasswordSchema } from "../../utils/schemas/authSchema";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  const nav = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldpassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const changePasswordService = useChangePassword();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    setIsLengthValid(password.length >= 8);
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
    setDoPasswordsMatch(password === confirmPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("password"), form.watch("confirmPassword")]);

  async function onSubmit(values: z.infer<typeof ChangePasswordSchema>) {
    setLoading(true);

    // if (values.oldpassword !== "admin") {
    //   setLoading(false);
    //   setErrorMessage("Old Password is incorrect.");
    //   toast.error("Old Password is incorrect.");
    //   return;
    // }

    if (!doPasswordsMatch) {
      setLoading(false);
      setErrorMessage("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setLoading(false);
      setErrorMessage(
        "New Password and Confirm Password do not match. Please try again."
      );
      toast.error(
        "New Password and Confirm Password do not match. Please try again."
      );
    } else {
      try {
        const response = await changePasswordService.mutateAsync({
          oldPassword: values.oldpassword,
          newPassword: values.password,
          confirmPassword: values.confirmPassword,
        });

        if (response.status === "success") {
          setLoading(false);
          setErrorMessage("");
          toast.success("Your password is successfully updated!");
          logout();
          return nav("/auth/change-password-success");
        } else {
          setLoading(false);
        }
      } catch (error: unknown) {
        form.reset();
        console.log(error);
        setErrorMessage("");
        setLoading(false);
      }
    }
  }

  return (
    <>
      <div className="form">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[24px]"
          >
            <FormField
              control={form.control}
              name="oldpassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[16px] font-[500]">
                    Old Password<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      className="rounded-[12px] bg-white h-[48px] border border-[#b6c1ca] py-[4px] px-[12px]"
                      placeholder="Enter your old password here"
                      {...field}
                    />
                  </FormControl>

                  {showOldPassword === false ? (
                    <EyeOff
                      onClick={toggleOldPasswordVisibility}
                      className=" absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={toggleOldPasswordVisibility}
                      className=" absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[16px] font-[500]">
                    New Password<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="rounded-[12px] bg-white h-[48px] border border-[#b6c1ca] py-[4px] px-[12px]"
                      placeholder="Enter your new password here"
                      {...field}
                    />
                  </FormControl>

                  {showPassword === false ? (
                    <EyeOff
                      onClick={togglePasswordVisibility}
                      className=" absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={togglePasswordVisibility}
                      className=" absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[16px] font-[500]">
                    Confirm Password
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      className="rounded-[12px] bg-white h-[48px] border border-[#b6c1ca] py-[4px] px-[12px]"
                      placeholder="Enter your confirm password here"
                      {...field}
                    />
                  </FormControl>

                  {showConfirmPassword === false ? (
                    <EyeOff
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 100 }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="text-[12px] text-desctructive -mt-[18px]"
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="condition">
              <div className="flex flex-col gap-1">
                <div className="flex justify-start items-center gap-2">
                  <div
                    className={`${
                      isLengthValid ? "bg-accentGreen" : "bg-destructive"
                    } rounded-full h-[16px] w-[16px] flex justify-center items-center`}
                  >
                    {isLengthValid ? (
                      <Check className="h-[10px] w-[10px] text-white" />
                    ) : (
                      <X className="h-[10px] w-[10px] text-white" />
                    )}
                  </div>
                  Contains at least 8 characters
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div
                    className={`${
                      hasNumber ? "bg-accentGreen" : "bg-destructive"
                    } rounded-full h-[16px] w-[16px] flex justify-center items-center`}
                  >
                    {hasNumber ? (
                      <Check className="h-[10px] w-[10px] text-white" />
                    ) : (
                      <X className="h-[10px] w-[10px] text-white" />
                    )}
                  </div>
                  Contains at least 1 number
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div
                    className={`${
                      hasSpecialChar ? "bg-accentGreen" : "bg-destructive"
                    } rounded-full h-[16px] w-[16px] flex justify-center items-center`}
                  >
                    {hasSpecialChar ? (
                      <Check className="h-[10px] w-[10px] text-white" />
                    ) : (
                      <X className="h-[10px] w-[10px] text-white" />
                    )}
                  </div>
                  Contains at least 1 special character
                </div>
              </div>
            </div>

            <Link
              to="/auth/reset-password"
              className="text-[14px] underline font-[400] cursor-pointer text-end"
            >
              Forgot password?
            </Link>

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
              Continue
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
