import * as React from "react";
import { cn } from "~/lib/utils";

export const List = ({
  className,
  children,
  ...props
}: React.ComponentProps<"ul">) => {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
};
