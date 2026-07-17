"use client";

import {
  Search,
  Bell,
  Circle,
  ChevronDown,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0b0b0b]/90 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between px-6 lg:px-8">

        {/* Mobile Title */}

        <div className="lg:hidden">

          <h1 className="ml-12 text-lg font-semibold tracking-tight text-white">
            OneAtlas
          </h1>

        </div>

        {/* Search */}

        <div className="hidden flex-1 lg:flex">

          <div className="relative w-full max-w-lg">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search jobs, schemas, workflows..."
              className="
              h-11
              w-full
              rounded-xl
              border
              border-white/6
              bg-[#141414]
              py-2
              pl-11
              pr-4
              text-sm
              text-zinc-100
              placeholder:text-zinc-500
              outline-none
              transition-all
              duration-200
              focus:border-red-800
              focus:bg-[#171717]
              "
            />

          </div>

        </div>

        {/* Right */}

        <div className="ml-auto flex items-center gap-3">

          {/* Status */}

          <div
            className="
            hidden
            items-center
            gap-2
            rounded-xl
            border
            border-emerald-900/40
            bg-emerald-950/20
            px-3
            py-2
            sm:flex
            "
          >

            <Circle
              size={10}
              className="fill-emerald-500 text-emerald-500"
            />

            <span className="text-sm font-medium text-emerald-400">
              System Online
            </span>

          </div>

          {/* Provider */}

          <button
            className="
            hidden
            items-center
            gap-2
            rounded-xl
            border
            border-white/6
            bg-[#141414]
            px-4
            py-2.5
            text-sm
            font-medium
            text-zinc-300
            transition-all
            duration-200
            hover:bg-[#1a1a1a]
            hover:border-red-900/40
            md:flex
            "
          >

            Groq

            <ChevronDown
              size={16}
              className="text-zinc-500"
            />

          </button>

          {/* Notification */}

          <button
            className="
            rounded-xl
            border
            border-white/6
            bg-[#141414]
            p-2.5
            text-zinc-300
            transition-all
            duration-200
            hover:bg-[#1a1a1a]
            hover:border-red-900/40
            "
          >

            <Bell size={18} />

          </button>

          {/* User */}

          <button
            className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-white/6
            bg-[#141414]
            px-2.5
            py-2
            transition-all
            duration-200
            hover:bg-[#1a1a1a]
            "
          >

            <div
              className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-red-700
              to-red-900
              text-sm
              font-semibold
              text-white
              shadow-md
              "
            >
              IC
            </div>

            <div className="hidden text-left lg:block">

              <p className="text-sm font-semibold text-white">
                Ishika Choubey
              </p>

              <p className="text-xs text-zinc-500">
                Developer
              </p>

            </div>

          </button>

        </div>

      </div>
    </header>
  );
}