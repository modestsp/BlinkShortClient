import { useQueryClient } from "react-query";
import { useLogin } from "../hooks/useLogin";
import { User } from "../types";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUrl } from "@/hooks/useCreateUrl";
import useGetUrls from "@/hooks/useGetUrls";

const formSchema = z.object({
  url: z.string().url().max(250),
});

const Home = () => {
  // Tomar el user del local storage
  const urls = useGetUrls("6e5d3c58-940f-461f-9363-34dadfd09645");

  const createUrl = useCreateUrl();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createUrl.mutateAsync({
      ...values,
    });

    console.log(values);
  }

  if (urls.isLoading) return <p>Loading</p>;
  if (createUrl.isLoading) return <p>Loading...</p>;
  if (createUrl.isError) return <p>Error</p>;
  console.log(urls, "Urls");
  return (
    <div className="flex flex-col items-center px-2">
      <p className="text-4xl text-white mb-2 mt-4 xl:text-5xl">BlinkShort✂️</p>
      <p className="text-white text-xl mt-4 mb-8 xl:text-2xl xl:font-semibold">
        {" "}
        Transform long, unsightly URLs into <br /> elegant, compact links with
        ease!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-full px-2 sm:w-96 xl:w-1/3 xl:mt-2"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white text-2xl mb-2 ">
                  Paste your URL
                </FormLabel>
                <FormControl>
                  <div className="sm:flex items-center sm:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <Input
                      className="bg-violet-200 text-white bg-opacity-25  border-violet-300 xl:h-14 xl:text-xl focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-500"
                      placeholder="Enter the link here"
                      {...field}
                    />
                    <Button
                      className="hover:bg-gray-600 mt-2 sm:mt-0 xl:h-14 xl:text-base"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="bg-blue-300" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Home;
