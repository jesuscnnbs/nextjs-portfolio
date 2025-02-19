import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const OutlineButton = ({ children, className, ...rest }: Props) => {
  return (
    <button className={twMerge(`group flex h-12 items-center justify-between 
       bg-secondary-dark px-8 text-xl font-semibold
    `, className)} {...rest}>
      <Copy>{children}</Copy>
    </button>
  );
};

const Copy = ({ children }: { children: ReactNode }) => {
  return (
    <span className="relative overflow-hidden uppercase">
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
};
