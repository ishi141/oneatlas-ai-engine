"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Copy,
    Download,
    Check,
    FileJson,
    Database,
    LayoutDashboard,
    ShieldCheck,
    DollarSign,
} from "lucide-react";

import { JsonView, allExpanded } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import GlassCard from "@/components/common/GlassCard";
import GlowButton from "@/components/common/GlowButton";

import { getJob } from "@/services/job";

import ResultTabs from "./ResultTabs";

import CostCards from "./CostCards";

interface Props {
    jobId: string;
}

type TabType =
    | "intent"
    | "schema"
    | "appspec"
    | "validation"
    | "cost";

export default function ResultViewer({
    jobId,
}: Props) {

    const [loading, setLoading] =
        useState(true);

    const [copied, setCopied] =
        useState(false);

    const [job, setJob] =
        useState<any>(null);

    const [active, setActive] =

        useState("intent");

    useEffect(() => {

        async function load() {

            try {

                const data =
                    await getJob(jobId);

                setJob(data.data);

            }

            finally {

                setLoading(false);

            }

        }

        if (jobId) {

            load();

        }

    }, [jobId]);

    const result = job?.result ?? {};

const currentJson = useMemo(() => {

  switch (active) {

    case "intent":
      return result.intent ?? {};

    case "schema":
      return result.schema ?? {};

    case "appspec":
      return result.appSpec ?? {};

    case "validation":
      return result.validation ?? {};

    case "cost":
      return result.cost ?? {};

    default:
      return {};

  }

}, [result, active]);

    async function copyJson() {

        await navigator.clipboard.writeText(
            JSON.stringify(
                currentJson,
                null,
                2
            )
        );

        setCopied(true);

        setTimeout(() => {

            setCopied(false);

        }, 2000);

    }

    function downloadJson() {

        const blob =
            new Blob(

                [
                    JSON.stringify(
                        currentJson,
                        null,
                        2
                    ),
                ],

                {
                    type: "application/json",
                }

            );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            `${active}.json`;

        a.click();

        URL.revokeObjectURL(url);

    }

    if (loading) {

        return (

            <GlassCard className="mt-16 p-8">

                <p className="text-center text-slate-400">

                    Loading generation...

                </p>

            </GlassCard>

        );

    }

    if (!job) {

        return (

            <GlassCard className="mt-16 p-8">

                <p className="text-center text-red-400">

                    Failed to load generation.

                </p>

            </GlassCard>

        );

    }

    const tabs = [

        {
            key: "intent",
            icon: FileJson,
            label: "Intent",
        },

        {
            key: "schema",
            icon: Database,
            label: "Schema",
        },

        {
            key: "appspec",
            icon: LayoutDashboard,
            label: "AppSpec",
        },

        {
            key: "validation",
            icon: ShieldCheck,
            label: "Validation",
        },

        {
            key: "cost",
            icon: DollarSign,
            label: "Cost",
        },

    ] as const;

    return (

        <GlassCard className="mt-20 p-8">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-3xl font-bold">

                        <p className="mb-2 text-cyan-400">

                            Pipeline Output

                        </p>

                        Generation Result

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Inspect every pipeline layer.

                    </p>

                </div>

                <div className="flex gap-3">

                    <GlowButton
                        onClick={copyJson}
                    >

                        {copied ? (

                            <>

                                <Check
                                    className="mr-2 h-4 w-4"
                                />

                                Copied

                            </>

                        ) : (

                            <>

                                <Copy
                                    className="mr-2 h-4 w-4"
                                />

                                Copy

                            </>

                        )}

                    </GlowButton>

                    <GlowButton
                        onClick={downloadJson}
                    >

                        <Download
                            className="mr-2 h-4 w-4"
                        />

                        Download

                    </GlowButton>

                </div>

            </div>

            <div className="mb-8 flex flex-wrap gap-3">

                <ResultTabs

                    active={active}

                    setActive={setActive}

                />

            </div>
            <div
                className="
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#0b1120]
        "
            >
                <div
                    className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-6
          py-4
          "
                >
                    <div>

                        <h3 className="text-lg font-semibold">

                            {active.charAt(0).toUpperCase() + active.slice(1)}

                        </h3>

                        <p className="mt-1 text-sm text-slate-400">

                            JSON Output

                        </p>

                    </div>

                    <div className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">

                        {active.toUpperCase()}

                    </div>

                </div>

                <div className="max-h-[700px] overflow-auto p-6">

                    <div

                        key={active}

                        className="animate-in fade-in duration-500"

                    >

                        <JsonView

                            data={currentJson}

                            shouldExpandNode={allExpanded}

                        />

                    </div>

                </div>

            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                    <p className="text-sm uppercase tracking-widest text-cyan-400">

                        Job ID

                    </p>

                    <p className="mt-3 break-all text-sm text-slate-300">

                        {jobId}

                    </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                    <p className="text-sm uppercase tracking-widest text-green-400">

                        Status

                    </p>

                    <p className="mt-3 font-semibold text-green-400">

                        Completed

                    </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                    <p className="text-sm uppercase tracking-widest text-violet-400">

                        Generated At

                    </p>

                    <p className="mt-3 text-sm text-slate-300">

                        {job.completedAt ?? job.updatedAt
                            ? new Date(job.generatedAt).toLocaleString()
                            : "N/A"}

                    </p>

                </div>

            </div>

            {job.cost && (

                <div className="mt-8 grid gap-6 md:grid-cols-4">

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                        <p className="text-xs uppercase text-slate-400">

                            Total Cost

                        </p>

                        <h3 className="mt-2 text-2xl font-bold">

                            ${Number(job.cost.totalCost ?? 0).toFixed(5)}

                        </h3>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                        <p className="text-xs uppercase text-slate-400">

                            Input Tokens

                        </p>

                        <h3 className="mt-2 text-2xl font-bold">

                            {job.cost.totalInputTokens}

                        </h3>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                        <p className="text-xs uppercase text-slate-400">

                            Output Tokens

                        </p>

                        <h3 className="mt-2 text-2xl font-bold">

                            {job.cost.totalOutputTokens}

                        </h3>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                        <p className="text-xs uppercase text-slate-400">

                            Latency

                        </p>

                        <h3 className="mt-2 text-2xl font-bold">

                            {job.cost.totalLatency} ms

                        </h3>

                    </div>

                </div>

            )}

            {result.cost && <CostCards cost={result.cost} />}

    </GlassCard>

  );

}