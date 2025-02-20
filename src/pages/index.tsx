import { Inter } from "next/font/google";
import { HomPage } from "@/components";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio - jesuscnnbs</title>
        <meta name="description" content="Portfolio web page for jesuscnnbs front-end developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:title" content="Portfolio - jesuscnnbs" />
        <meta property="og:description" content="Portfolio web page for jesuscnnbs front-end developer" />
        <meta property="og:image" content="/frontend-bg.jpg" />
        

        <link rel="canonical" href="/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <HomPage />
      </main>
    </>
  );
}
