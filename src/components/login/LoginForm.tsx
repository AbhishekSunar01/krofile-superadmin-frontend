import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
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
import { useLoginUser } from "../../services/mutations/authMutation";
import { LoginSchema } from "../../utils/schemas/authSchema";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { isError, error, mutateAsync } = useLoginUser();
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setLoading(true);

    const data = await mutateAsync({
      email: values.email,
      password: values.password,
    });
    // console.log("data from mutateasync", data);
    if (data.status === "success") {
      setLoading(false);
      setErrorMessage("");
      return nav("/auth/2fa");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isError) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  }, [isError, error]);

  return (
    <div className="h-full">
      <div className="mainContent w-[75%] mx-auto h-[90%] flex justify-center items-center">
        <div className="flex flex-col gap-[24px] w-full">
          <div className="heading mx-auto flex flex-col gap-[12px] w-[400px]">
            <div className="text-[28px] w-[320px] mx-auto leading-[33.6px] text-center font-semibold m-0 p-0">
              Welcome to <span className="text-primary">Krofile</span>&nbsp;
              Super Admin
            </div>
            <div className="text-center text-[16px] w-full font-normal m-0 p-0">
              Simplifying your admin workflow every day
            </div>
          </div>

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
                          className="absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                        />
                      ) : (
                        <Eye
                          onClick={togglePasswordVisibility}
                          className="absolute top-9 right-4 text-[#6F7C8E] cursor-pointer"
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between space-x-2 -mt-3">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            name="remember"
                            value={field.value?.toString()}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            className="accent-slate-950 text-slate-900 data-[state=checked]:bg-[#14181f] border border-[#14181f]"
                          />
                        </FormControl>
                        <FormLabel className="text-[14px] font-[400] ml-3 muted">
                          Remember me
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Link
                    to="/auth/reset-password"
                    className="text-[14px] underline font-[400] cursor-pointer"
                  >
                    Forgot password?
                  </Link>
                </div>
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="text-[12px] text-destructive"
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
                  Login
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
