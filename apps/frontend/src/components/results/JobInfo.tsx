"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hash,
} from "lucide-react";

interface Job {
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
}

interface Props {
  job: Job;
  jobId: string;
}

export default function JobInfo({
  job,
  jobId,
}: Props) {

  const status = job?.status ?? "pending";

  const completedAt = job?.completedAt
    ? new Date(job.completedAt).toLocaleString()
    : null;

  const updatedAt = job?.updatedAt
    ? new Date(job.updatedAt).toLocaleString()
    : null;

  const createdAt = job?.createdAt
    ? new Date(job.createdAt).toLocaleString()
    : null;

  const cards = [
    {
      title: "Job ID",
      value: jobId,
      icon: Hash,
    },
    {
      title: "Status",
      value: status,
      icon: CheckCircle2,
    },
    {
      title: "Completed",
      value: completedAt ?? "Running",
      icon: Clock3,
    },
    {
      title: "Created",
      value: createdAt ?? updatedAt ?? "—",
      icon: CalendarDays,
    },
  ];

  return (

    <section className="space-y-6">

      {/* Header */}

      <div>

        <h3 className="text-xl font-semibold text-white">

          Job Details

        </h3>

        <p className="mt-2 text-sm text-zinc-500">

          Metadata associated with the current generation.

        </p>

      </div>

      {/* Cards */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
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

                  <Icon
                    size={20}
                    className="text-red-400"
                  />

                </div>

                {card.title === "Status" && (

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      capitalize

                      ${
                        status === "completed"
                          ? "bg-emerald-900/20 text-emerald-400"
                          : status === "failed"
                          ? "bg-red-900/20 text-red-400"
                          : "bg-amber-900/20 text-amber-400"
                      }
                    `}
                  >

                    {status}

                  </span>

                )}

              </div>

              <p className="mt-6 text-sm font-medium text-zinc-500">

                {card.title}

              </p>

              <p
                className="
                  mt-2
                  break-all
                  text-sm
                  font-medium
                  leading-6
                  text-white
                "
              >

                {card.value}

              </p>

            </div>

          );

        })}

      </div>

    </section>

  );

}