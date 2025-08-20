// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface Signup2Props {
//   heading?: string;
//   logo: {
//     url: string;
//     src: string;
//     alt: string;
//     title?: string;
//   };
//   buttonText?: string;
//   googleText?: string;
//   signupText?: string;
//   signupUrl?: string;
// }

// const Signup = ({
//   heading = "Signup",
//   logo = {
//     url: "https://www.shadcnblocks.com",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
//     alt: "logo",
//     title: "shadcnblocks.com",
//   },
//   buttonText = "Create Account",
//   signupText = "Already a user?",
//   signupUrl = "https://shadcnblocks.com",
// }: Signup2Props) => {
//   return (
//     <section className="bg-muted h-screen">
//       <div className="flex h-full items-center justify-center">
//         <div className="flex flex-col items-center gap-6 lg:justify-start">
//           {/* Logo */}
//           <a href={logo.url}>
//             <img
//               src={logo.src}
//               alt={logo.alt}
//               title={logo.title}
//               className="h-10 dark:invert"
//             />
//           </a>
//           <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
//             {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
//             <div className="flex w-full flex-col gap-2">
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 className="text-sm"
//                 required
//               />
//             </div>
//             <div className="flex w-full flex-col gap-2">
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 className="text-sm"
//                 required
//               />
//             </div>
//             <div className="flex w-full flex-col gap-2">
//               <Label>Confirm Password</Label>
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 className="text-sm"
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               {buttonText}
//             </Button>
//           </div>
//           <div className="text-muted-foreground flex justify-center gap-1 text-sm">
//             <p>{signupText}</p>
//             <a
//               href={signupUrl}
//               className="text-primary font-medium hover:underline"
//             >
//               Login
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export { Signup };



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
import { Link } from "react-router";
import { useNavigate } from "react-router";
import SocialLoginButtons from "@/components/modules/auth/SocialBtn";
import PasswordInput from '@/components/ui/passwordInput';


const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name is too short, Minimum 2 charecters long" })
      .max(50, { message: "Name is too long, Max 50 charecter long" }),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          "Password must include uppercase, lowercase, and a special character.",
      }),
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
      fullName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
  });


  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {

    try {
      const userInfo = {
        name: data.fullName,
        email: data.email,
        password: data.password,
      };
      console.log(userInfo);
      // navigate("/auth/verify", {
      //   state: data.email,
      // });
    } catch (error) {
      console.log(error);

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
              name="fullName"
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
