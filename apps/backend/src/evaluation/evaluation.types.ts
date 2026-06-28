import { CostSummary } from "../cost/cost.types.js";

export interface EvaluationReport {

  jobId: string;

  generatedAt: string;

  validation: {

    intent: boolean;

    schema: boolean;

    appSpec: boolean;

    cross: boolean;

  };

  repairs: {

    total: number;

    successful: number;

    failed: number;

    history: unknown[];

  };

  providers: {

    used: string[];

    models: string[];

  };

  workflows: {

    total: number;

    names: string[];

  };

  cost: CostSummary;

}