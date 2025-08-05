import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { formatDate } from "~/lib/utils";
import { DataTable } from "../ui/data-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Delete, Trash } from "lucide-react";
import { Button } from "../ui/button";

export type Media = {
  id: string;
  name: string;
  description: string;
  url: string;
  format: string;
  size: number;
  height?: number;
  width?: number;
  createdAt: string;
  updatedAt: string;
  onDelete: () => void;
};

const formatSize = (bytes: number) => {
  const kbs = Math.floor((bytes / 1024) * 10) / 10;
  const mbs = Math.floor((bytes / 1024 / 1024) * 10) / 10;
  return kbs > 500 ? `${mbs} MB` : `${kbs} KB`;
};

const columns: ColumnDef<Media>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Image",
    cell: ({ row }) => {
      const { url, name, description } = row.original;
      return (
        <div className="flex items-center gap-4">
          <img src={url} alt={description} className="size-20 rounded-md" />
          <div>
            <h5 className="text-foreground">{name}</h5>
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "format",
    header: "Format",
  },
  {
    header: "Dimensions",
    cell: ({ row }) => {
      const { height, width } = row.original;
      return (
        <span>
          {height}x{width}
        </span>
      );
    },
  },
  {
    header: "Size",
    cell: ({ row }) => {
      const { size } = row.original;
      return <span>{formatSize(size)}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <span className="text-muted-foreground italic">{formatDate(date)}</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const media = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(media.id)}
            >
              <Copy />
              Copy Media ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={media.onDelete}>
              <Trash />
              Delete Media
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const MediaTable = ({ data }: { data: Media[] }) => {
  return <DataTable name="Messages" columns={columns} data={data} />;
};
