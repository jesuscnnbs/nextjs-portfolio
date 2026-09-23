import { AiOutlineArrowRight } from "react-icons/ai";
import { SectionHeader } from "../util/SectionHeader";
import Reveal from "../util/Reveal";
import { MyLinks } from "../nav/Header";
import { Stats } from "./Stats";

export const About = () => {
  return (
    <section id="about" className="section-wrapper py-20">
      <SectionHeader title="About" dir="l" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              <span className="bg-secondary-dark text-white py-2 px-3 font-bold mr-1 float-left text-2xl">
                I
              </span>
              &apos;m an AI Engineer with a strong foundation in full-stack web development and 5+ years of experience building production-ready applications. I combine hands-on expertise in React, Vue, Next.js, Java Spring Boot, and modern delivery practices with focused training in LLMs, agentic workflows, RAG, secure AI applications, real-time communication, data pipelines, and AI engineering project delivery. My background bridges product-oriented software engineering and applied AI, allowing me to design and ship intelligent systems that are practical, scalable, and aligned with business goals.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              I currently work as Freelance Developer. At the moment I&apos;m
              focusing on turning AI ideas into real products, from designing a
              clean UX to shipping the full stack behind it.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              Outside of work, I love spending time with my family, friends and
              my dog. Another of my passions is to play handball, I&apos;m a
              member of a team called Bahía de Almería.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              I&apos;m actively looking for new positions where I can merge my
              love for AI with my passion for building great fullstack
              experiences.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-secondary-light">
                <span>My links</span>
                <AiOutlineArrowRight />
              </div>
              <MyLinks />
            </div>
          </Reveal>
        </div>
        <Stats />
      </div>
    </section>
  );
};
