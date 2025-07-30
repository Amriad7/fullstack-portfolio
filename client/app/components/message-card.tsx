import type { Message } from "./tables/messages-table";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

const formatDate = (date: Date) => {
  const now = new Date();
  if (
    date.getDay() === now.getDay() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return date.toLocaleString("en", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

const MessageCard = ({
  message,
  dialogRef,
}: {
  message: Message | undefined;
  dialogRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger ref={dialogRef}></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You Got Message</DialogTitle>
            <DialogDescription>
              {"At "}
              {formatDate(new Date(message?.createdAt || 0))}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-secondary/5 p-3 rounded-md">
            <h5 className="text-foreground">{message?.name}</h5>
            <p className="text-muted-foreground text-sm">{message?.email}</p>
          </div>

          {message?.content}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default MessageCard;
