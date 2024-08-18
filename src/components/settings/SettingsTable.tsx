import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SearchIcon from "../../assets/search.svg";

import { z } from "zod";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Printer,
} from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  searchQuery: z.string(),
});

const SettingsTable = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <div className="flex tableHeading bg-white p-4 items-center justify-between rounded-[8px]">
        <div className="search">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2 items-center h-auto"
            >
              <FormField
                control={form.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem className="relative">
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="w-[380px] !pl-[40px] px-[12px] bg-[#F6F7F9] text-[14px] text-[#525E6F]"
                        placeholder="Search"
                        {...field}
                      />
                    </FormControl>
                    <div className="searchIcon absolute -top-[2px] left-3">
                      <img src={SearchIcon} alt="serach icon here" />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex options justify-center items-center gap-[16px]">
          <div className="pagination text-[#6F7C8E] text-[14px] flex justify-center items-center gap-[14px] py-1">
            1 - 4 of 4{" "}
            <ChevronLeft className="cursor-pointer h-[20px] w-[20px]" />{" "}
            <ChevronRight className="cursor-pointer h-[20px] w-[20px]" />
          </div>
          <div className="flex dataOptions justify-center items-center gap-[18px] text-[#6e6e71] py-1 border-l border-[#6F7C8E] pl-[16px]">
            <Filter className="h-[20px] w-[20px] cursor-pointer" />
            <Printer className="h-[20px] w-[20px] cursor-pointer" />
            <Download className="h-[20px] w-[20px] cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="table"></div>
    </>
  );
};

export default SettingsTable;
