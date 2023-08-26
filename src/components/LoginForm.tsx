import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { User } from "@/types";

const formSchema = z.object({
  username: z.string().nonempty({ message: "Cannot be empty" }).max(25),
  password: z.string().nonempty({ message: "Cannot be empty" }).max(50),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    const cachedUser = queryClient.getQueryData<User | null>("currentUser");
    const storedUser = localStorage.getItem("currentUser");
    if (cachedUser || storedUser) {
      navigate("/");
    }
  });
  const login = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutateAsync({ username: values.username, password: values.password });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col w-full items-center "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base lg:text-lg text-white font-semibold">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className="w-[220px] sm:w-[250px]"
                  placeholder="Enter your username here"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-bold text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base lg:text-lg text-white font-semibold">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="w-[220px] sm:w-[250px]"
                  placeholder="Enter your password here"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-bold text-sm" />
            </FormItem>
          )}
        />
        <Button
          className="w-[220px] bg-gradient-to-b hover:bg-gray-600 bg-[#300171d9] sm:w-[250px] rounded-sm"
          type="submit"
        >
          {login.isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
      <div className="text-red-500 font-semibold text-sm  lg:text-base mt-2">
        {login.isError && "username or password is incorrect"}
      </div>
    </Form>
  );
};

export default LoginForm;
