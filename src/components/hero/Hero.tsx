import Reveal from "../util/Reveal";
import DotGrid from "./DotGrid";
import { OutlineButton } from "../buttons/OutlineButton";

const Hero = () => {
  return (
    <section className="text-slat-100 py-24 md:py-32">
      <div className="relative">
        <div className="pointer-events-none relative z-10">
          <Reveal>
            <h1 className="inline bg-gradient-to-r from-primary-light to-secondary bg-clip-text pointer-events-auto text-4xl sm:text-6xl font-black text-transparent md:text-8xl">
              Front-end{" "}Developer<span className="text-4xl">◆</span>
            </h1>
          </Reveal>
          <Reveal>
            <div className="pointer-events-none my-4">
            <h2 className="inline pointer-events-auto text-xl sm:text-2xl text-zinc-300 md:my-4 md:text-4xl">
              I'm {" "}
              <span className="font-semibold text-secondary-light">
                Jesús
              </span>
            </h2>
            </div>
          </Reveal>
          <Reveal>
            <p className="pointer-events-auto leading-relaxed md:leading-relaxed max-w-xl text-sm text-zinc-300 md:text-base">
              I'm a software developer with a passion for building web
              applications. I'm currently working as a software developer as
              <span className="font-semibold text-secondary-light">
                {" "}
                @Freelancer
                {" "}
              </span>
              and I'm looking for new challenges.
            </p>
          </Reveal>
          <Reveal>
            <OutlineButton
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView();
              }}
              className="pointer-events-auto mt-6"
            >
              Contact Me
            </OutlineButton>
          </Reveal>
        </div>
        <DotGrid />
      </div>
    </section>
  );
};

export default Hero;
