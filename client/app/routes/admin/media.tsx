import ImageUploadDialog from "~/components/image-upload-dialog";
import { MediaTable, type Media } from "~/components/tables/media-table";

import type { Route } from "./+types/media";
import { api } from "~/lib/api";
import { toast } from "sonner";
import { useRevalidator } from "react-router";
import { Button } from "~/components/ui/button";

export const clientLoader = async ({}: Route.ClientLoaderArgs) => {
  const media = await api
    .get("/media")
    .then((res) => res.data.media)
    .catch(() => {
      console.log("Something went wrong");
    });

  return media || [];
};

const Media = ({ loaderData }: Route.ComponentProps) => {
  const { revalidate } = useRevalidator();

  const handleDeleteMedia = async (id: string) => {
    await api
      .delete(`/media/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        revalidate();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong");
      });
  };

  const media = loaderData.map((media: Media) => {
    return {
      ...media,
      onDelete: () => handleDeleteMedia(media.id),
    };
  });

  return (
    <div className="p-4 mt-6">
      <div className="flex items-center justify-end gap-2">
        <ImageUploadDialog />
      </div>
      <div className="container mx-auto py-5">
        <MediaTable data={media} />
      </div>
    </div>
  );
};
export default Media;
