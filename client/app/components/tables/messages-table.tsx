import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";

import { Button } from "../ui/button";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Check, Copy, Eye, MoreHorizontal, Trash } from "lucide-react";
import { formatDate } from "~/lib/utils";

export type Message = {
  id: string;
  name: string;
  email: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  onDelete: () => void;
  onOpen: () => void;
  onMarkRead: () => void;
};

export const columns: ColumnDef<Message>[] = [
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
    header: "Sender",
    cell: ({ row }) => {
      const message = row.original;
      return (
        <div>
          <h5 className="text-foreground">{message.name}</h5>
          <p className="text-muted-foreground text-xs">{message.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Message",
    cell: ({ row }) => (
      <span className="font-light">{row.getValue("content")}</span>
    ),
  },
  {
    accessorKey: "isRead",
    header: "Status",
    cell: ({ row }) => {
      const isRead = row.original.isRead;
      return isRead ? (
        <Badge>Viewed</Badge>
      ) : (
        <Badge variant="outline">Sent</Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-muted-foreground italic">{formatDate(date)}</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const message = row.original;

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
              onClick={() => navigator.clipboard.writeText(message.id)}
            >
              <Copy />
              Copy message ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={row.original.onOpen}>
              <Eye />
              View Message
            </DropdownMenuItem>
            <DropdownMenuItem onClick={row.original.onMarkRead}>
              <Check />
              Mark as read
            </DropdownMenuItem>
            <DropdownMenuItem onClick={row.original.onDelete}>
              <Trash />
              Delete Message
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const MessagesTable = ({ data }: { data: Message[] }) => {
  return <DataTable name="Messages" columns={columns} data={data} />;
};
