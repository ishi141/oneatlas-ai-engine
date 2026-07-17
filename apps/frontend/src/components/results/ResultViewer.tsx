"use client";

import { useEffect, useMemo, useState } from "react";

import { getJob } from "@/services/job";

import ResultHeader from "./ResultHeader";
import ResultTabs from "./ResultTabs";
import JsonPanel from "./JsonPanel";
import JobInfo from "./JobInfo";
import CostCards from "./CostCards";
import RepairHistory from "./RepairHistory";
import IntegrationList from "./IntegrationList";

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

  const [loading, setLoading] = useState(true);

  interface JobResponse {
    data: {
      status: string;
      cost?: {
        totalCost: number;
        totalInputTokens: number;
        totalOutputTokens: number;
        totalLatency: number;
      };
      result: Record<string, unknown>;
      repairLog?: unknown[];
      createdAt?: string;
      updatedAt?: string;
      completedAt?: string;
    };
  }

  const [job, setJob] =
    useState<JobResponse["data"] | null>(null);

  const [copied, setCopied] = useState(false);

  const [active, setActive] =
    useState<TabType>("intent");

  useEffect(() => {

    async function load() {

      try {

        const data = await getJob(jobId);

        setJob(data.data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    if (jobId) load();

  }, [jobId]);

  const result: any = job?.result ?? {};

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

  }, [active, result]);

  if (loading) {

    return (

      <div className="flex h-[500px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

          <h3 className="text-lg font-semibold text-white">

            Loading Results...

          </h3>

          <p className="mt-2 text-sm text-zinc-500">

            Fetching generated architecture.

          </p>

        </div>

      </div>

    );

  }

  if (!job) {

    return (

      <div className="flex h-[500px] items-center justify-center">

        <div className="text-center">

          <h3 className="text-xl font-semibold text-red-400">

            Unable to load generation

          </h3>

          <p className="mt-2 text-sm text-zinc-500">

            Please try generating again.

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <ResultHeader
        copied={copied}
        active={active}
        currentJson={currentJson}
        setCopied={setCopied}
      />

      <ResultTabs
        active={active}
        onChange={(value: string) =>
          setActive(value as TabType)
        }
      />

      <JsonPanel
        active={active}
        currentJson={currentJson}
      />

      <JobInfo
        job={job}
        jobId={jobId}
      />

      {job.cost && (
        <CostCards cost={job.cost} />
      )}

      <RepairHistory
        repairLog={
          (job?.repairLog ??
            job?.result?.repairLog ??
            []) as any[]
        }
      />

      <IntegrationList
        integrations={
          ((result as any).appSpec?.integrations ??
            []) as any[]
        }
      />

    </div>

  );

}