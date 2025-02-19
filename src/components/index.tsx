import React from "react";
import { SideBar } from "./nav/SideBar";
import { Header } from "./nav/Header";
import Hero from "./hero/Hero";
import { About } from "./about/About";
import { Projects } from "./projects/Projects";
import { Experience } from "./experience/Experience";
import { Contact } from "./contact/Contact";

export const HomPage = () => {
  return (
    <div className="grid grid-cols-[54px_1fr]">
      <SideBar />
      <main className="bg-main-element">
        <Header />
        <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-32 pb-24 overflow-hidden">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
    </div>
  );
};
