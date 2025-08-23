import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import PasswordInput from "@/components/ui/passwordInput";
import { useLoginMutation } from '@/redux/features/auth/auth.api';
import type { IError } from '@/types';
import { toast } from "sonner"


const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Please enter a valid email address",
    }),
  password: z.string().min(6, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data).unwrap();
      navigate("/");
      toast.success("Login successful");
    } catch (err) {
      const error = err as IError;
      console.log("Login error:", error);
      if (error.status === 404) {
        form.setError("password", {
          type: "manual",
          message: error?.data?.message
        })
        toast.error(error?.data?.message || "Login failed");
      }

    }
  };

  return (
    <section className="bg-muted min-h-[calc(100vh-70px)] py-1 flex justify-center items-center">
      <div className="my-10 p-6 rounded-lg shadow-sm bg-background max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm mt-4">
          <p>Need an account?</p>
          <Link
            to="/auth/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}