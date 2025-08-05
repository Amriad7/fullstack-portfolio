import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import FileUpload from "./file-upload";
import { api } from "~/lib/api";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useRef } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Upload } from "lucide-react";

const MAX_IMG_SIZE = 1024 * 1024; // 1Mb

const formSchema = z.object({
  image: z
    .instanceof(File, { error: "Please select an image" })
    .refine((file) => file.size <= MAX_IMG_SIZE, "Image size is too large"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

const ImageUploadDialog = () => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("description", values.description);

    await api
      .post("/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        closeBtnRef.current?.click();
        form.reset();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload /> Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            dialog to upload images and file
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <FileUpload
                          onFilesUploaded={(files) => {
                            if (Array.isArray(files) && files[0]) {
                              form.setValue("image", files[0]);
                            } else if (files instanceof File) {
                              form.setValue("image", files);
                            }
                          }}
                          acceptedFileTypes={{
                            "image/jpeg": [".jpg", ".jpeg"],
                            "image/png": [".png"],
                            "image/gif": [".gif"],
                            "image/bmp": [".bmp"],
                            "image/webp": [".webp"],
                            "image/svg+xml": [".svg"],
                            "image/tiff": [".tiff", ".tif"],
                            "image/heif": [".heif", ".heic"],
                            "image/x-icon": [".ico"],
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
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
                        <Textarea placeholder="description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Upload</Button>
                  <DialogClose asChild ref={closeBtnRef}>
                    <Button variant={"outline"}>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ImageUploadDialog;
