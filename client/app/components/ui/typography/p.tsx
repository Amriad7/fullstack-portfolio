import * as React from "react";
import { cn } from "~/lib/utils";

export const P = ({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("leading-8 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
};
