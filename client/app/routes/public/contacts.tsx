import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import GlowEffect from "~/components/glow-effect";
import SocialButtons from "~/components/social-buttons";
import { Button } from "~/components/ui/button";
import Heading from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { P, H4 } from "~/components/ui/typography";
import Fancy from "~/components/ui/typography/fancy";
import { messageSchema } from "~/schema/messageSchema";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/lib/api";
import { toast } from "sonner";

import type { Route } from "./+types/contacts";
import { useSession } from "~/lib/auth-client";

export const clientLoader = ({ params }: Route.ClientLoaderArgs) => {};

const Contacts = ({ loaderData }: Route.ComponentProps) => {
  const { data } = useSession();
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: data
      ? {
          userId: data.user.id,
          name: data.user.name,
          email: data.user.email,
          content: "",
        }
      : {
          name: "",
          email: "",
          content: "",
        },
  });

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    setPending(true);
    await api
      .post("/messages", values, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        form.reset();
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
    setPending(false);
  }

  return (
    <div className="py-30 relative">
      <GlowEffect />
      {/* CONTACTS SECTION */}
      <section className="max-w-lg px-4 m-auto space-y-16">
        {/* CONTENT */}
        <div>
          <Heading description="Let's Build Something Awesome">
            Get in <Fancy>Touch</Fancy>
          </Heading>
          <P className="text-muted-foreground text-center">
            If you're looking for a reliable fullstack developer for your next
            project, feel free to contact me using the links or the form below.
          </P>
        </div>
        {/* FORM */}
        <div className="space-y-8">
          <H4 className="font-normal text-center">Send A Message</H4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" disabled={pending} {...field} />
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
                        type="email"
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-60"
                        placeholder="Message"
                        disabled={pending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  type="submit"
                  className="w-32"
                  disabled={pending}
                >
                  <Loader2
                    className={cn(
                      "animate-spin hidden",
                      pending && "inline-block"
                    )}
                  />
                  Send
                </Button>
                <span>Or</span>
                <SocialButtons />
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};
export default Contacts;
