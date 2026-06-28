export type PipelineEventType =
  | "stage_start"
  | "stage_complete"
  | "stage_failed"
  | "generation_complete";

export interface PipelineEvent {

  type: PipelineEventType;

  stage: string;

  message: string;

  timestamp: string;

}