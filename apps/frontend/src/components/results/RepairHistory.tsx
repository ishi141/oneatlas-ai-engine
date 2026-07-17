"use client";

import {
  Wrench,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

interface RepairLog {
  strategy: string;
  success: boolean;
  time: string;
}

interface Props {
  repairLog?: RepairLog[];
}

export default function RepairHistory({
  repairLog = [],
}: Props) {

  return (

    <section className="space-y-6">

      {/* Header */}

      <div>

        <h3 className="text-xl font-semibold text-white">

          Repair History

        </h3>

        <p className="mt-2 text-sm text-zinc-500">

          Automatic fixes applied during validation.

        </p>

      </div>

      {/* Empty State */}

      {repairLog.length === 0 ? (

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

            <Wrench
              size={28}
              className="text-red-400"
            />

          </div>

          <h4 className="text-lg font-semibold text-white">

            No Repairs Required

          </h4>

          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">

            The pipeline completed successfully without requiring
            any repair strategy.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {repairLog.map((repair, index) => (

            <div
              key={index}
              className="
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

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl

                      ${
                        repair.success
                          ? "bg-emerald-900/20"
                          : "bg-red-900/20"
                      }
                    `}
                  >

                    {repair.success ? (

                      <CheckCircle2
                        size={22}
                        className="text-emerald-400"
                      />

                    ) : (

                      <XCircle
                        size={22}
                        className="text-red-400"
                      />

                    )}

                  </div>

                  <div>

                    <h4 className="font-semibold text-white">

                      {repair.strategy}

                    </h4>

                    <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">

                      <Clock3 size={15} />

                      {new Date(
                        repair.time
                      ).toLocaleString()}

                    </div>

                  </div>

                </div>

                <span
                  className={`
                    inline-flex
                    w-fit
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-semibold

                    ${
                      repair.success
                        ? "bg-emerald-900/20 text-emerald-400"
                        : "bg-red-900/20 text-red-400"
                    }
                  `}
                >

                  {repair.success
                    ? "Successful"
                    : "Failed"}

                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}