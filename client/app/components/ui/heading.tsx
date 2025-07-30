import type React from "react";
import { H1, H4 } from "./typography";
import { cn } from "~/lib/utils";

const Heading = ({
  children,
  description,
  className,
  ...props
}: React.ComponentProps<"header"> & { description: string }) => {
  return (
    <header className={cn("text-center space-y-4", className)} {...props}>
      <H1 className=" text-gray-800 dark:text-gray-50 ">{children}</H1>
      <H4 className="font-normal">{description}</H4>
    </header>
  );
};

export default Heading;
