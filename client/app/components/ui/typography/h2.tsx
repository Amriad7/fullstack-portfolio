import * as React from "react";
import { cn } from "~/lib/utils";

export const H2 = ({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-serif font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
