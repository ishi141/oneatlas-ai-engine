import { GroqProvider } from "./provider/groq.provider.js";
import { GeminiProvider } from "./provider/gemini.provider.js";
import { OpenAIProvider } from "./provider/openai.provider.js";
import { AnthropicProvider } from "./provider/anthropic.provider.js";

import { PipelineStage, LLMProvider } from "./types.js";

export function getProviders(
  stage: PipelineStage
): LLMProvider[] {

  switch (stage) {

    case "intent":
      return [
        new GroqProvider(),
        new OpenAIProvider(),
        new AnthropicProvider(),
      ];

    case "schema":
      return [
        new OpenAIProvider(),
        new AnthropicProvider(),
        new GroqProvider(),
      ];

    case "appspec":
      return [
        new GeminiProvider(),
        new OpenAIProvider(),
        new GroqProvider(),
        new AnthropicProvider(),
      ];

    default:
      return [
        new GroqProvider(),
      ];
  }

}
