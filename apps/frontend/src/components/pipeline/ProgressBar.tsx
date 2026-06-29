"use client";

import { usePipeline } from "@/context/PipelineContext";

export default function ProgressBar() {

    const { stages } = usePipeline();

    const completed = Object.values(stages).filter(Boolean).length;

    const progress = (completed / 6) * 100;

    return (
        <div className="mx-auto mt-12 w-full max-w-6xl">

            <div className="mb-4 flex items-center justify-between">

                <span className="text-sm text-slate-400">

                    Pipeline Progress
                    <div className="mt-2 text-xs text-slate-500">

                        {completed} / 6 stages completed

                    </div>
                </span>

                <span className="font-semibold text-cyan-400">

                    {Math.round(progress)}%

                </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-white/10">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-green-400 transition-all duration-700"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </div>
    );

}