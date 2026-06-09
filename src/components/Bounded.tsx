/* eslint-disable @typescript-eslint/no-explicit-any */


import clsx from "clsx";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type BoundedProps = {
  as?: React.ElementType<ComponentPropsWithoutRef<"section">>;
  className?: string;
  children?: ReactNode;
} & Record<string, any>;

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) => {
  return (
    <Comp
      className={clsx("px-4 first:pt-10 md:px-6", className)}
      {...restProps}
    >
      <div className="mx-auto flex flex-col place-items-center w-full max-w-7xl">
        {children}
      </div>
    </Comp>
  );
};