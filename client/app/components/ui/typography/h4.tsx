import * as React from "react";
import { cn } from "~/lib/utils";

export const H4 = ({
  className,
  children,
  ...props
}: React.ComponentProps<"h4">) => {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-serif tracking-tight", className)}
      {...props}
    >
      {children}
    </h4>
  );
};
