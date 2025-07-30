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
import { signIn } from "~/lib/auth-client";
import { useState } from "react";

export const signinSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const SignIn = () => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSocialSignin = async (provider: "google" | "github") => {
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

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    setPending(true);
    await signIn.email(
      { ...values },
      {
        onSuccess: (ctx) => {
          toast.success(`Welcome back! ${ctx.data.user.name}`);
          navigate("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
    setPending(false);
  }

  return (
    <main className="py-20 relative">
      <GlowEffect />
      <section className="m-auto max-w-md px-6 space-y-6">
        <Heading description="Login to your account" className="mb-15">
          <Fancy>Sign In</Fancy>
        </Heading>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        disabled={pending}
                        placeholder="Password"
                        type="password"
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
                Login
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
            onClick={() => handleSocialSignin("github")}
          >
            <Github /> Sign-in with Github
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            disabled={pending}
            onClick={() => handleSocialSignin("google")}
          >
            <Mail /> Sign-in with Google
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <P className="muted-foreground">Dont have an account?</P>
          <Button size="lg" variant="link">
            <Link to="/auth/signup">Sign up</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
