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
import { useRegister } from "@/hooks/useRegister";

const formSchema = z.object({
  username: z.string().nonempty({ message: "Cannot be empty" }).min(5).max(25),
  email: z.string().nonempty({ message: "Cannot be empty" }).email(),
  password: z
    .string()
    .nonempty({ message: "Cannot be empty" })
    .min(6)
    .max(50)
    .refine(
      (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
          value
        );

        return hasUppercase && hasLowercase && hasSpecialCharacter;
      },
      {
        message:
          "Password must contain at least one uppercase, one lowercase and one special character",
      }
    ),
});

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    const cachedUser = queryClient.getQueryData<User | null>("currentUser");
    const storedUser = localStorage.getItem("currentUser");
    if (cachedUser || storedUser) {
      navigate("/");
    }
  });
  const register = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    register.mutateAsync({
      username: values.username,
      email: values.email,
      password: values.password,
    });

    console.log("values", values);
    if (register.isSuccess) {
      console.log("REGISTER DATA", register.data);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col py-8 px-4 w-full items-center "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full sm:w-2/3 xl:w-1/2">
              <FormLabel className="text-white xl:text-xl">Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username here" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 font-bold text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full sm:w-2/3 xl:w-1/2">
              <FormLabel className="text-white xl:text-xl">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email here"
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
            <FormItem className="w-full sm:w-2/3 xl:w-1/2">
              <FormLabel className="text-white xl:text-xl">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password here"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-bold text-sm" />
            </FormItem>
          )}
        />
        <div className="text-red-500 font-semibold text-sm lg:text-base mt-2">
          {register.isError && "Something went wrong :S"}
        </div>
        <Button
          className="w-full rounded-sm sm:w-1/3 xl:w-[400px]"
          type="submit"
        >
          {register.isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default Register;
