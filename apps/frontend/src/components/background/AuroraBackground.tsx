"use client";

export default function AuroraBackground() {
  return (
    <>
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]" />
    </>
  );
}