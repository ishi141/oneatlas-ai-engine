"use client";

import {
  Plug,
  CheckCircle2,
} from "lucide-react";

interface Integration {
  provider?: string;
  name?: string;
  type?: string;
}

interface Props {
  integrations?: Integration[];
}

export default function IntegrationList({
  integrations = [],
}: Props) {

  return (

    <section className="space-y-6">

      {/* Header */}

      <div>

        <h3 className="text-xl font-semibold text-white">

          Integrations

        </h3>

        <p className="mt-2 text-sm text-zinc-500">

          External services detected in the generated application.

        </p>

      </div>

      {/* Empty State */}

      {integrations.length === 0 ? (

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-[#111111]
            px-8
            py-16
            text-center
          "
        >

          <div
            className="
              mb-6
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-red-950/20
            "
          >

            <Plug
              size={28}
              className="text-red-400"
            />

          </div>

          <h4 className="text-lg font-semibold text-white">

            No Integrations

          </h4>

          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">

            This application does not require any external
            integrations.

          </p>

        </div>

      ) : (

        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >

          {integrations.map((integration, index) => (

            <div
              key={index}
              className="
                group
                rounded-2xl
                border
                border-white/5
                bg-[#111111]
                p-6
                transition-all
                duration-300
                hover:border-red-900/40
                hover:bg-[#161616]
                hover:shadow-lg
                hover:shadow-red-950/20
              "
            >

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-950/20
                    transition-colors
                    duration-300
                    group-hover:bg-red-900/30
                  "
                >

                  <Plug
                    size={20}
                    className="text-red-400"
                  />

                </div>

                <CheckCircle2
                  size={18}
                  className="text-emerald-400"
                />

              </div>

              <h4
                className="
                  mt-6
                  text-lg
                  font-semibold
                  text-white
                "
              >

                {integration.provider ||
                  integration.name ||
                  "Unknown Integration"}

              </h4>

              <p className="mt-2 text-sm text-zinc-500">

                {integration.type ||
                  "External Service"}

              </p>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}