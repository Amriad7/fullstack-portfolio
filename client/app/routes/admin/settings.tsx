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

import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { H3 } from "~/components/ui/typography";
import { settingsSchema } from "~/schema/settingsSchema";

import type { Route } from "./+types/settings";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/lib/api";
import { useRevalidator } from "react-router";

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const { data } = await api.get("/settings", {
    withCredentials: true,
  });

  return data;
};

const initialValues = {
  title: "",
  description: "",
  keywords: "",
  name: "",
  role: "",
  bio: "",
  githubUrl: "",
  linkedinUrl: "",
  emailUrl: "",
};

const Settings = ({ loaderData }: Route.ComponentProps) => {
  const { revalidate } = useRevalidator();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: loaderData || initialValues,
  });

  async function onSubmit(values: z.infer<typeof settingsSchema>) {
    setIsPending(true);
    api[loaderData ? "put" : "post"]("/settings", values, {
      withCredentials: true,
    })
      .then(({ data }) => {
        toast.success(data.message, { position: "top-center" });
      })
      .catch(({ response }) => {
        toast.error(response.data.message, { position: "top-center" });
      })
      .finally(() => {
        setIsPending(false);
        revalidate();
      });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-6 space-y-12">
            <section className="space-y-6">
              <H3 className="mb-6">Site Informatons</H3>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Keywords (comma seperated)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="space-y-6">
              <H3 className="mb-6">Personal Profile</H3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Role"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="My Biography"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="space-y-6">
              <H3 className="mb-6">Social Media</H3>
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Github account"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linked In</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Linked In account"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Personal email"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <Button type="submit" disabled={isPending}>
              <Loader2
                className={cn(
                  "animate-spin hidden",
                  isPending && "inline-block"
                )}
              />
              Save Settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Settings;
