"use client";

import { useState } from "react";
import {
  Sparkles,
  LayoutDashboard,
  Workflow,
  FileCode2,
  Activity,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    icon: Workflow,
    label: "Pipeline",
  },
  {
    icon: FileCode2,
    label: "Results",
  },
  {
    icon: Activity,
    label: "Activity",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile */}

      <button
        onClick={() => setOpen(true)}
        className="
        fixed
        left-4
        top-4
        z-50
        rounded-xl
        border
        border-white/10
        bg-[#121212]
        p-2.5
        text-zinc-200
        shadow-lg
        lg:hidden
        "
      >
        <Menu size={20} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
fixed
left-0
top-0
z-50
flex
h-screen
w-[270px]
flex-col
border-r
border-white/5
bg-[#0b0b0b]
transition-transform
duration-300

${open ? "translate-x-0" : "-translate-x-full"}

lg:static
lg:translate-x-0
`}
      >
        {/* Logo */}

        <div className="border-b border-white/5 px-7 py-7">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-red-700
                to-red-900
                shadow-md
                "
              >
                <Sparkles
                  size={18}
                  className="text-white"
                />
              </div>

              <div>

                <h2 className="text-lg font-semibold tracking-tight text-white">
                  OneAtlas
                </h2>

                <p className="text-sm text-zinc-500">
                  AI Engine
                </p>

              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 lg:hidden"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex-1 px-5 py-7">

          <p
            className="
            mb-5
            px-3
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-zinc-600
            "
          >
            Navigation
          </p>

          <div className="space-y-2">

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`
group
flex
w-full
items-center
gap-3
rounded-xl
px-4
py-3
text-sm
font-medium
transition-all
duration-200

${
  item.active
    ? "bg-[#181818] text-white border border-red-900/40"
    : "text-zinc-400 hover:bg-[#161616] hover:text-white"
}
`}
                >
                  <Icon
                    size={18}
                    className={
                      item.active
                        ? "text-red-500"
                        : "text-zinc-500 group-hover:text-red-400"
                    }
                  />

                  <span>{item.label}</span>

                  {item.active && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-red-600" />
                  )}
                </button>
              );
            })}

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-white/5 p-5">

          <button
            className="
            mb-2
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-zinc-400
            transition-all
            hover:bg-[#161616]
            hover:text-white
            "
          >
            <Settings
              size={18}
              className="text-zinc-500"
            />
            Settings
          </button>

          <button
            className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-zinc-400
            transition-all
            hover:bg-[#161616]
            hover:text-white
            "
          >
            <HelpCircle
              size={18}
              className="text-zinc-500"
            />
            Help
          </button>

        </div>

      </aside>
    </>
  );
}