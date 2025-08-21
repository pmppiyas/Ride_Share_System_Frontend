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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SocialLoginButtons from "@/components/modules/auth/SocialBtn";
import PasswordInput from '@/components/ui/passwordInput';
import { useRegisterMutation } from '@/redux/features/auth/auth.api';
import type { IError } from '@/types';


const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Please enter a valid email address",
      }),

    phone: z.string().regex(/^01[3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number",
    }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^()_])[A-Za-z\d@$!%*?#&^()_]{6,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),

    comfirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          "Password must include uppercase, lowercase, and a special character.",
      }),
  })
  .refine((data) => data.password === data.comfirmPassword, {
    message: "Password don't match",
    path: ["comfirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Signup() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      comfirmPassword: "",
    },
  });

  const [register] = useRegisterMutation(undefined)

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        location: {
          type: "Point",
          coordinates: [40.252, 45.751],
        }
      };
      console.log(userInfo);
      await register(userInfo).unwrap()
      navigate("/auth/login");
    } catch (err) {
      const error = err as IError;
      console.log(error.status)

    }
  };

  return (
    <section className="bg-muted  min-h-[calc(100vh-70px)] py-1">
      <div className=" my-10 p-6  rounded-lg shadow-sm bg-background max-w-md mx-auto">
        <h2 className=" text-2xl font-semibold text-center mb-6">Sign Up Here</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="018XXXXXXXX"
                      {...field}
                    />
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
                    <PasswordInput {...field}></PasswordInput>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />

            {/* Re Password */}
            <FormField
              control={form.control}
              name="comfirmPassword"
              render={({ field }) => (
                <>
                  <FormLabel>Comfirm password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field}></PasswordInput>
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
              {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
        <div className="space-y-2 mt-4">
          <SocialLoginButtons></SocialLoginButtons>

          <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
            <p>Already have an account?</p>

            <Link
              to={"/auth/login"}
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
