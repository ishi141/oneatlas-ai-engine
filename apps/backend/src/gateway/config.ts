import { PipelineStage } from "./types.js";

export const ROUTING_CONFIG: Record<
  PipelineStage,
  {
    primary: string;
    fallback: string;
  }
> = {

  intent: {

    primary: "groq",

    fallback: "openai",

  },

  schema: {

    primary: "openai",

    fallback: "anthropic",

  },

  appspec: {

    primary: "gemini",

    fallback: "openrouter",

  },

};