"use client";
import AnimatedGrid from "@/components/background/AnimatedGrid";
import AuroraBackground from "@/components/background/AuroraBackground";
import MouseGlow from "@/components/background/MouseGlow";

import Navbar from "@/components/layout/Navbar";

import HeroSection from "@/components/landing/HeroSection";
import PromptCard from "@/components/landing/PromptCard";

import PipelinePreview from "@/components/pipeline/PipelinePreview";

import ProgressBar from "@/components/pipeline/ProgressBar";

import { useGeneration } from "@/context/GenerationContext";

import LiveTerminal from "@/components/pipeline/LiveTerminal";
import ResultViewer from "@/components/results/ResultViewer";

export default function Home() {
  const {

  jobId,

  events,

  loading,

} = useGeneration();
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      <MouseGlow />

      <AnimatedGrid />

      <AuroraBackground />

      <Navbar />

      <section className="relative z-10">

  <HeroSection />

  <div className="mx-auto mt-10 max-w-6xl px-6">

    <PromptCard />

  </div>

</section>

<section className="relative z-10 px-6 py-24">

  <PipelinePreview />

  <ProgressBar />

</section>

<section className="relative z-10 px-6">

  <div className="mx-auto max-w-6xl">

    {jobId && (

      <div className="mb-6 text-cyan-400">

        Job ID : {jobId}

      </div>

    )}

    <LiveTerminal

      events={events}

    />

  </div>

</section>

<section className="relative z-10 px-6 py-20">

  <div className="mx-auto max-w-6xl">

    {jobId && !loading && (

      <ResultViewer

        jobId={jobId}

      />

    )}

  </div>

</section>

      <section className="relative z-10 py-24">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2">
            <p className="text-sm uppercase tracking-widest text-cyan-400">
              Providers
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              3
            </h2>

            <p className="mt-2 text-slate-400">
              Groq • Gemini • OpenAI
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2">
            <p className="text-sm uppercase tracking-widest text-violet-400">
              Pipeline
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              6
            </h2>

            <p className="mt-2 text-slate-400">
              Intelligent AI Stages
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2">
            <p className="text-sm uppercase tracking-widest text-green-400">
              Validation
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              100%
            </h2>

            <p className="mt-2 text-slate-400">
              Cross Layer Verification
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2">
            <p className="text-sm uppercase tracking-widest text-yellow-400">
              Repair Engine
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              AI
            </h2>

            <p className="mt-2 text-slate-400">
              Automatic JSON Recovery
            </p>
          </div>

        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">

          <div>

            <h2 className="text-xl font-bold">

              OneAtlas AI Engine

            </h2>

            <p className="mt-2 text-slate-400">

              AI Native Architecture Generator

            </p>

          </div>

          <div className="flex gap-6 text-slate-400">

            <button className="transition hover:text-white">
              GitHub
            </button>

            <button className="transition hover:text-white">
              Docs
            </button>

            <button className="transition hover:text-white">
              API
            </button>

          </div>

        </div>

      </footer>

    </main>
  );
}