"use client";

import { JsonView, allExpanded } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

interface Props {
  active: string;
  currentJson: Record<string, unknown> | unknown[];
}

export default function JsonPanel({
  active,
  currentJson,
}: Props) {

  const hasData =
    Array.isArray(currentJson)
      ? currentJson.length > 0
      : Object.keys(currentJson ?? {}).length > 0;

  return (

    <section className="overflow-hidden rounded-2xl border border-white/5 bg-[#111111] shadow-xl">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-white/5 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h3 className="text-xl font-semibold text-white">

            {active.charAt(0).toUpperCase() + active.slice(1)}

          </h3>

          <p className="mt-1 text-sm text-zinc-500">

            Generated JSON Output

          </p>

        </div>

        <span
          className="
            inline-flex
            w-fit
            rounded-full
            border
            border-red-900/40
            bg-red-950/30
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-red-300
          "
        >

          {active}

        </span>

      </div>

      {/* Viewer */}

      <div
        className="
          overflow-auto
          bg-[#0b0b0b]
          p-6
        "
        style={{
          maxHeight: "700px",
        }}
      >

        {!hasData ? (

          <div className="flex h-72 items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#191919]">

                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-zinc-500"
                >
                  <path d="M9 17v-2a4 4 0 0 1 4-4h7" />
                  <path d="M13 7l7 4-7 4" />
                  <path d="M3 3v18" />
                </svg>

              </div>

              <h4 className="text-lg font-semibold text-white">

                No Data Available

              </h4>

              <p className="mt-2 text-sm text-zinc-500">

                This section has not been generated yet.

              </p>

            </div>

          </div>

        ) : (

          <div
            key={active}
            className="
              animate-in
              fade-in
              duration-300
              rounded-xl
              border
              border-white/5
              bg-[#141414]
              p-5
            "
          >

            <JsonView
              data={currentJson}
              shouldExpandNode={allExpanded}
            />

          </div>

        )}

      </div>

    </section>

  );

}