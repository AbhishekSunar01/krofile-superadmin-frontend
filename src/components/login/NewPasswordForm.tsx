import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { NewPasswordSchema } from "../../utils/schemas/authSchema";

interface IProps {
  setVerified: (value: boolean) => void;
}

export default function ({ setVerified }: IProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  //   const nav = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    setIsLengthValid(password.length >= 8);
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
    setDoPasswordsMatch(password === confirmPassword);
  }, [form.watch("password"), form.watch("confirmPassword")]);

  function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    setLoading(true);

    if (!doPasswordsMatch) {
      setLoading(false);
      setErrorMessage("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setLoading(false);
      setErrorMessage(
        "Password and Confirm Password do not match. Please try again."
      );
      toast.error(
        "Password and Confirm Password do not match. Please try again."
      );
    } else {
      setTimeout(() => {
        setVerified(true);
        toast.success("Your password is successfully updated!");
        setLoading(false);
        setErrorMessage("");
      }, 2000);
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
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[16px] font-[500]">
                    Password<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="rounded-[12px] bg-white h-[48px] border border-[#b6c1ca] py-[4px] px-[12px]"
                      placeholder="Enter your password here"
                      {...field}
                    />
                  </FormControl>

                  {showPassword === false ? (
                    <EyeOff
                      onClick={togglePasswordVisibility}
                      className="absolute top-9 right-4 muted cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={togglePasswordVisibility}
                      className="absolute top-9 right-4 muted cursor-pointer"
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
                    Confirm Password<span className="text-desctructive">*</span>
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
                      className="absolute top-9 right-4 text-muted cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute top-9 right-4 text-muted cursor-pointer"
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
                      isLengthValid ? "bg-[#00A81C]" : "bg-destructive"
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
                      hasNumber ? "bg-[#00A81C]" : "bg-destructive"
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
                      hasSpecialChar ? "bg-[#00A81C]" : "bg-destructive"
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
              Update Password
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
