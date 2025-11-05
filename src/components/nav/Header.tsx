import Link from "next/link";
import React from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { OutlineButton } from "../buttons/OutlineButton";
import { siteConfig } from "@/config/site";

export const Header = () => {
  return (
    <header className="h-[72px] px-4 sticky top-0 z-20 bg-mask-pattern">
      <div className="flex items-center justify-between h-full">
        <MyLinks />
        <OutlineButton onClick={() => window.open(siteConfig.resume)} className="h-8 bg-secondary-content text-primary-content px-4 text-sm">
          My Resume
        </OutlineButton>
      </div>
    </header>
  );
};

export const MyLinks = () => (
  <div className="flex items-center text-lg gap-4">
    <Link
      className="text-secondary-content hover:text-secondary-light transition-colors"
      href={siteConfig.social.linkedin}
      target="_blank"
      rel="nofollow"
    >
      <SiLinkedin />
    </Link>
    <Link
      className="text-secondary-content hover:text-secondary-light transition-colors"
      href={siteConfig.social.github}
      target="_blank"
      rel="nofollow"
    >
      <SiGithub />
    </Link>
  </div>
);
