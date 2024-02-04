import { User } from "../types";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUrl } from "@/hooks/useCreateUrl";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }).max(500),
});

const Home = () => {
  const [shortUrl, setShortUrl] = useState<string | undefined>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();
  const createUrl = useCreateUrl();
  useEffect(() => {
    const userInLocalStorage = localStorage.getItem("currentUser");
    if (userInLocalStorage) {
      const storedUser = JSON.parse(localStorage.getItem("currentUser") ?? "");
      setCurrentUser(storedUser);
    }
    setShortUrl(createUrl.data?.response.shortUrl);
  }, [createUrl.data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createUrl.mutateAsync({
      ...values,
      userId: currentUser?.id,
    });
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl!);
    toast({
      description: "Copied to clipboard",
      className: "bg-[#0f172a] text-white",
    });
  };
  if (createUrl.isError)
    return (
      <div className="text-white flex flex-col justify-center items-center">
        <p className="text-2xl">
          Something went wrong while creating your link :(
        </p>
        <button
          className="mt-3 p-1 text-xl hover:scale-105 transition-all"
          onClick={() => window.location.reload()}
        >
          Go back
        </button>
      </div>
    );
  return (
    <div className="flex flex-col items-center px-2">
      <p className="text-4xl text-white mb-2 mt-4 xl:text-5xl">Blink Short✂️</p>
      <p className="text-white text-xl mt-4 mb-8 xl:text-2xl xl:font-semibold">
        {" "}
        Transform long, unsightly URLs into <br /> elegant, compact links with
        ease!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-full  sm:w-[500px] xl:w-[800px]"
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
                  <div className="flex flex-col sm:flex-row items-center sm:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <Input
                      className="bg-violet-200 text-white bg-opacity-25  border-violet-300 xl:h-14 xl:text-xl focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-500"
                      placeholder="Enter the link here"
                      {...field}
                    />
                    <Button
                      className="rounded-r-md hover:bg-gray-600 mt-2 sm:mt-0 xl:h-14 xl:text-base transition-all"
                      type="submit"
                    >
                      {createUrl.isLoading ? "Loading..." : "Submit"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-base mt-2" />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {createUrl.isError ?? <p>Something went wrong...</p>}
      {createUrl.isSuccess && (
        <div
          // style={{ opacity: !createUrl.isSuccess ? "0" : "1" }}
          className="flex justify-between text-sm sm:text-lg text-white gap-2 font-bold border p-6 mt-6 w-full sm:w-[500px] xl:w-[800px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[2px_2px_10px_10px_#44337a] rounded-sm transition-all duration-3s bg-[#0f172a] bg-opacity-60"
        >
          <p>{createUrl.data?.response?.shortUrl ?? ""}</p>
          <Copy
            onClick={handleCopyToClipboard}
            size={20}
            className="hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
