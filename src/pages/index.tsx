import { Inter } from "next/font/google";
import { HomPage } from "@/components";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>AI FullStack Developer - jesuscnnbs</title>
        <meta name="description" content="Portfolio of jesuscnnbs, AI FullStack Developer building AI-powered web applications" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextjs-portfolio-six-green.vercel.app" />
        <meta property="og:title" content="AI FullStack Developer - jesuscnnbs" />
        <meta property="og:description" content="Portfolio of jesuscnnbs, AI FullStack Developer building AI-powered web applications" />
        <meta property="og:image" content="https://nextjs-portfolio-six-green.vercel.app/frontend-bg.jpg" />
        

        <link rel="canonical" href="/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <HomPage />
      </main>
      <Analytics />
      
    </>
  );
}
