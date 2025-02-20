import { AiOutlineArrowRight } from "react-icons/ai";
import { SectionHeader } from "../util/SectionHeader";
import Reveal from "../util/Reveal";
import { MyLinks } from "../nav/Header";
import { Stats } from "./Stats";

export const About = () => {
  return (
    <section id="about" className="section-wrapper min-h-[60vh]">
      <SectionHeader title="About" dir="l" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              <span className="bg-secondary-dark text-white py-2 px-3 font-bold mr-1 float-left text-2xl">
                I
              </span>
              &apos;m Jesús, a web developer from Almería, Andalucía, Spain. I specialize in frontend development,
              primarily with React, Next.js and Tailwind CSS.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              I currently work as Freelance Developer. At the moment enjoying
              by making very cool designs and building them into real products.
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
              love for code with my passion for cool designs.
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
