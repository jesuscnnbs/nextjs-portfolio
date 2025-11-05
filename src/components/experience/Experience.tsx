import { SectionHeader } from "../util/SectionHeader";
import { ExperienceItem } from "./ExperienceItem";

export const Experience = () => {
  return (
    <section className="section-wrapper py-20" id="experience">
      <SectionHeader title="Experience" dir="l" />
      {experience.map((item) => (
        <ExperienceItem key={item.title} {...item} />
      ))}
    </section>
  );
};

const experience = [
  {
    title: "Artificial Intelligence Talentum",
    position: "Full Stack Developer",
    time: "May 2025 - July 2025",
    location: "Murcia",
    description:
      "SpringBoot 3 scalable, REST API using with focus on performance, security, modern Java features and consuming SOAP services with a responsive front-end developed in React JS",
    tech: [
      "React",
      "Java",
      "Spring Boot",
      "API REST",
      "Git",
      "Linux",
      "Docker",
      "PostgreSQL",
    ],
  },
  {
    title: "Freelance",
    position: "Full Stack Developer",
    time: "November 2024- May 2025",
    location: "Almería",
    description:
      "I help build and scale products for small businesses and startups.",
    tech: [
      "React",
      "Nextjs",
      "Tailwind",
      "Git",
      "GitHub",
      "Figma",
      "Vercel",
      "Stripe",
      "AWS",
      "Docker",
      "PostgreSQL",
    ],
  },
  {
    title: "Snorkel Spain S.L.",
    position: "Front end Developer",
    time: "2024",
    location: "Almería (Remote)",
    description:
      "Mid Front end Developer for Snorkel Spain S.L. I was responsible for the development of the frontend of the company's new AI product",
    tech: ["React", "Nextjs", "Tailwind", "Git", "GitHub", "Laravel"],
  },
  {
    title: "Alten Spain S.L.",
    position: "Software Engineer Consultant",
    time: "2022 - 2023",
    location: "Valencia (Remote)",
    description:
      "Participated in the development of some projects for the company's clients using Vue, Node, Python and AWS",
    tech: [
      "React Native",
      "Vue",
      "Node",
      "Python",
      "AWS",
      "Docker",
      "PostgreSQL",
      "Git",
      "GitHub",
      "Figma",
      "Docker",
      "Java",
      "Spring",
    ],
  },
  {
    title: "Rithmi",
    position: "Software Engineer",
    time: "2020 - 2021",
    location: "Valencia",
    description:
      "Junior Front end Developer for Rithmi, a company that were creating non invasive medical devices to detect heart arrhythmia.",
    tech: ["React Native", "Expo", "React", "Node", "AWS", "Git", "GitHub", "Figma", "Docker", "iOS", "Android"],
  },
];
