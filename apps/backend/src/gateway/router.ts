import { OpenAIProvider } from "./provider/openai.provider.js";
import { GroqProvider } from "./provider/groq.provider.js";
import { GeminiProvider } from "./provider/gemini.provider.js";

import { PipelineStage, LLMProvider } from "./types.js";

export function getProvider(
  stage: PipelineStage
): LLMProvider {

  switch (stage) {

    case "intent":
      return new GroqProvider();

    case "schema":
      return new GroqProvider();

    case "appspec":
      return new GeminiProvider();

    default:
      return new GroqProvider();

  }

}