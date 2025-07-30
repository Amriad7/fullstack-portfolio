import * as React from "react";
import { cn } from "~/lib/utils";

export const H1 = ({
  className,
  children,
  ...props
}: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-serif font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
