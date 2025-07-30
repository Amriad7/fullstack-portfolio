import * as React from "react";
import { cn } from "~/lib/utils";

export const H3 = ({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-serif font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
