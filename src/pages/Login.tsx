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
  username: z.string().min(1).max(25),
  password: z.string().min(1).max(50),
});

const Login = () => {
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

    console.log(values);
  }
  if (login.isSuccess) {
    console.log(login.data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col  items-center "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username here" {...field} />
              </FormControl>
              <FormMessage className="bg-blue-300" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password here" {...field} />
              </FormControl>
              <FormMessage className="bg-blue-300" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Login;
