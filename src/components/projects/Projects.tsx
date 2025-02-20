import React from "react";
import { SectionHeader } from "../util/SectionHeader";
import { Project } from "./Project";

export const Projects = () => {
  return (
    <section className="section-wrapper" id="projects">
      <SectionHeader title="Projects" dir="r" />

      <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
        {projects.map((project) => {
          return <Project key={project.title} {...project} />;
        })}
      </div>
    </section>
  );
};

const projects = [
  {
    title: "Santa Mónica",
    imgSrc: "project-imgs/santamonica.jpg",
    code: "https://github.com/jesuscnnbs/sm-medusa-storefront",
    projectLink: "https://sm-medusa-storefront.vercel.app/es",
    tech: ["Medusajs Ecommerce", "Nextjs", "Tailwind", "Typescript", "Stripe", "Heroku", "Vercel"],
    description:
      "A real-time coaching app for students learning to paint. This app is my baby, designed and built on my own.",
    modalContent: (
      <>
        <p>
          Pain.app is a real-time coaching app for students learning to paint.
          This app is my baby, designed and built on my own.
        </p>
        <p>
          The tech stack is based on top of Flutter for the mobile app,
          connected to a Python & FastAPI backend, with data stored in Postgres,
          deployed on Heroku.
        </p>
        <p>
          Because this isn&apos;t real, here&apos;s some gibberish to fill space{" "}
          {":)"}
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
          quia officia odio nulla consectetur aperiam ad tempora magni magnam
          nesciunt.
        </p>
        <p>
          Fuga id sapiente facere ipsa eius exercitationem officiis deleniti,
          rerum dolorum. Deserunt soluta modi culpa animi.
        </p>
      </>
    ),
  },
  {
    title: "Innsomnia web 2020",
    imgSrc: "project-imgs/innsomnia2020.jpg",
    code: "https://www.github.com",
    projectLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tech: ["Laravel", "CSS", "HTML", "Blade", "Nova", "Hubspot"],
    description:
      "A web for a company that needs to manage their clients and publish their products and services",
    modalContent: (
      <>
        <p>
          The web is for a company that needs to manage their clients and publish their products and services.
        </p>
        <p>
          I work primarly in the frontend, using Laravel, CSS, HTML and Blade developing all the static pages and componentof the web.
        </p>
        <p>
          We were 2 developers working in the frontend and backend.
        </p>
        <p>
          We used Hubspot for blog entries and Nova for the CMS. nd we also developed a intranet for the users and clients of the company.
        </p>
      </>
    ),
  },
];
