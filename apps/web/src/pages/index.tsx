import Head from 'next/head'
import { Header } from "@/common/header/Header";
import { Hero } from "@/components/sections/Hero";
import {Features} from "@/components/sections/Features";
import {Footer} from "@/common/footer/Footer";
import {Pricing} from "@/components/sections/Pricing";
import {projectName} from "@/vars";
import {FAQ} from "@/components/FAQ";
import {FrequentlyAskedQuestion} from "@/components/sections/FrequentyAskedQuestions";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - { projectName }</title>
        <meta name="description" content="XXX is an open-source project to help you share and track your links. Shorten URLs. Generate QR Codes. Track traffic." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <FrequentlyAskedQuestion />
      <Footer />
    </>
  )
}
