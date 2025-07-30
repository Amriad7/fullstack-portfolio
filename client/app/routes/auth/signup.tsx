import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Button } from "~/components/ui/button";
import Heading from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import Fancy from "~/components/ui/typography/fancy";
import GlowEffect from "~/components/glow-effect";
import { P } from "~/components/ui/typography";
import { Github, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

import { Link, useNavigate } from "react-router";
import { signIn, signUp } from "~/lib/auth-client";
import { useState } from "react";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Signup = () => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  /* handle signup success */

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setPending(true);
    await signUp.email(
      { ...values },
      {
        onSuccess: () => {
          toast.success("Your account created successfuly");
          navigate("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
    setPending(false);
  }

  const handleSocialSignup = async (provider: "google" | "github") => {
    setPending(true);
    await signIn.social(
      {
        provider,
        callbackURL: import.meta.env.VITE_CLIENT_URL,
      },
      {
        onSuccess: () => {
          toast.success("Your account created successfuly");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
    setPending(false);
  };

  return (
    <main className="py-20 relative">
      <GlowEffect />
      <section className="m-auto max-w-md px-6 space-y-6">
        <Heading description="create a new account" className="mb-15">
          <Fancy>Sign Up</Fancy>
        </Heading>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        disabled={pending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        disabled={pending}
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        disabled={pending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="lg"
                type="submit"
                className="w-full mt-5"
                disabled={pending}
              >
                <Loader2
                  className={cn(
                    "animate-spin hidden",
                    pending && "inline-block"
                  )}
                />
                Create Account
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            disabled={pending}
            onClick={() => handleSocialSignup("github")}
          >
            <Github /> Sign-up with Github
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            disabled={pending}
            onClick={() => handleSocialSignup("google")}
          >
            <Mail /> Sign-up with Google
          </Button>
        </div>

        <div className="flex items-center justify-center">
          <P className="muted-foreground">Already have an account?</P>
          <Button size="lg" variant="link">
            <Link to="/auth/signin">Sign in</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Signup;
