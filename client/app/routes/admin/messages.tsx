import { api } from "~/lib/api";
import type { Route } from "./+types/messages";
import {
  columns,
  MessagesTable,
  type Message,
} from "~/components/tables/messages-table";
import { H3 } from "~/components/ui/typography";
import { toast } from "sonner";
import { useRevalidator } from "react-router";
import { useRef, useState } from "react";
import MessageCard from "~/components/message-card";
import { Button } from "~/components/ui/button";
import { Check, Trash } from "lucide-react";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const messages = await api
    .get("/messages")
    .then((res) => {
      return res.data.messages;
    })
    .catch((err) => {
      console.log("Error fetching messages");
    });

  return messages || [];
};

const Messages = ({ loaderData }: Route.ComponentProps) => {
  const { revalidate } = useRevalidator();
  const [currentMsg, setCurrentMsg] = useState<Message>();
  const msgDialogRef = useRef<HTMLButtonElement>(null);

  const messages = loaderData.map((message: Message) => {
    return {
      ...message,
      onDelete: () => handleDeleteMessage(message.id),
      onOpen: () => handleOpenMessage(message),
      onMarkRead: () => handleMarkRead(message.id),
    };
  });

  const handleDeleteMessage = async (id: string) => {
    await api
      .delete(`/messages/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        revalidate();
      })
      .catch((error) => {
        toast.error("Couldnt delete this message");
      });
  };

  const handleOpenMessage = (message: Message) => {
    setCurrentMsg(message);
    msgDialogRef.current?.click();
    handleMarkRead(message.id);
  };

  const handleMarkRead = async (id: string) => {
    await api
      .put(
        `messages/${id}`,
        { isRead: true },
        {
          withCredentials: true,
        }
      )
      .then(() => revalidate())
      .catch(() => console.log("Couldn't update messages"));
  };

  return (
    <div className="p-4">
      <MessageCard message={currentMsg} dialogRef={msgDialogRef} />
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline">
          <Check /> Mark as Read
        </Button>
        <Button variant="destructive">
          <Trash /> Delete
        </Button>
      </div>
      <div className="container mx-auto py-5">
        <MessagesTable columns={columns} data={messages} />
      </div>
    </div>
  );
};
export default Messages;
