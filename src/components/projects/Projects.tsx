import React from "react";
import { SectionHeader } from "../util/SectionHeader";
import { Project } from "./Project";

export const Projects = () => {
  return (
    <section className="section-wrapper py-20" id="projects">
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
      "An ecommerce for a burger restaurant in Almería, with the best reviews in town.",
    modalContent: (
      <>
        <p>
        An ecommerce for a burger restaurant in Almería, with the best reviews in town.
        </p>
        <p>
          It is developed with Medusa, a headless ecommerce platform, and Nextjs, Tailwind and Typescript.
        </p>
        <p>
          The payment is made with Stripe and the database is Postgres.
        </p>
        <p>
          The front is stored in Vercel and the back in Heroku.
        </p>
      </>
    ),
  },
  {
    title: "Innsomnia web 2020",
    imgSrc: "project-imgs/innsomnia2020.jpg",
    code: "https://www.github.com",
    projectLink: "https://web.archive.org/web/20200527175228/https://innsomnia.es/es/",
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
