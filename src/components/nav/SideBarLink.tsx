import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  href: string;
  children: string;
  value: string;
}

const MotionLink = motion(Link);

export const SideBarLink = ({
  setSelected,
  selected,
  children,
  href,
  value,
}: Props) => {
  return (
    <MotionLink
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
      href={href}
      onClick={() => {
        setSelected(value);
      }}
      className={`writing-vertical h-24 shrink-0 flex items-center justify-center border-r-2 text-secondary-content text-sm transition-all w-full ${
        selected === value
          ? "bg-secondary-transparent border-secondary-light opacity-100"
          : "border-transparent hover:border-r-zinc-500 opacity-65 hover:bg-secondary-transparent"
      }`}
    >
      {children}
    </MotionLink>
  );
};
