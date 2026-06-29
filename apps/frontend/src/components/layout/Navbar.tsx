"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#pipeline", label: "Pipeline" },
    { href: "#docs", label: "Documentation" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-[#090d1bcc]/80 px-6 py-4 backdrop-blur-2xl">

        <Link href="/" className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              OneAtlas AI
            </h2>

            <p className="text-sm text-slate-400">
              Multi-LLM Architecture Engine
            </p>

          </div>

        </Link>

        <nav className="hidden items-center gap-10 md:flex">

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 transition hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}

        </nav>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden"
        >
          <Menu className="h-7 w-7 text-white" />
        </button>

      </div>

      {open && (

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg">

          <div className="flex justify-end p-8">

            <button onClick={() => setOpen(false)}>

              <X className="h-8 w-8 text-white" />

            </button>

          </div>

          <div className="mt-24 flex flex-col items-center gap-10">

            {links.map((link) => (

              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl text-white"
              >
                {link.label}
              </a>

            ))}

          </div>

        </div>

      )}

    </header>
  );
}