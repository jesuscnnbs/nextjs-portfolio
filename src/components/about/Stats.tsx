import { Chip } from "../util/Chip";
import Reveal from "../util/Reveal";
import { AiFillCode, AiFillSmile } from "react-icons/ai";

export const Stats = () => {
  return (
    <div className="relative">
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiFillCode className="text-secondary-light text-2xl" />
            <span className="font-bold ml-2">Use at work</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            <Chip>TypeScript</Chip>
            <Chip>Next.js</Chip>
            <Chip>React</Chip>
            <Chip>Python</Chip>
            <Chip>LLMs</Chip>
            <Chip>LangChain</Chip>
            <Chip>RAG</Chip>
            <Chip>OpenAI API</Chip>
            <Chip>Vector DBs</Chip>
            <Chip>Prompt Engineering</Chip>
            <Chip>NodeJS</Chip>
            <Chip>PostgreSQL</Chip>
            <Chip>Tailwind</Chip>
            <Chip>AWS</Chip>
            <Chip>Docker</Chip>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiFillSmile className="text-secondary-light text-2xl" />
            <span className="font-bold ml-2">Use for fun</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            <Chip>Agents</Chip>
            <Chip>Pinecone</Chip>
            <Chip>Hugging Face</Chip>
            <Chip>Figma</Chip>
            <Chip>Supabase</Chip>
            <Chip>Express</Chip>
            <Chip>Postgres</Chip>
            <Chip>MongoDB</Chip>
            <Chip>GraphQL</Chip>
            <Chip>Vercel</Chip>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
