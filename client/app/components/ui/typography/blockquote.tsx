import * as React from "react";
import { cn } from "~/lib/utils";

export const BlockQuote = ({
  className,
  children,
  ...props
}: React.ComponentProps<"blockquote">) => {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
};
