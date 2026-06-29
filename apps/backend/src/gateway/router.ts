import { GroqProvider } from "./provider/groq.provider.js";
import { GeminiProvider } from "./provider/gemini.provider.js";
import { OpenAIProvider } from "./provider/openai.provider.js";
import { AnthropicProvider } from "./provider/anthropic.provider.js";

import { DeepSeekProvider } from "./provider/deepseek.provider.js";
import { OpenRouterProvider } from "./provider/openrouter.provider.js";
import { GoogleAIProvider } from "./provider/googleai.provider.js";
import { MistralProvider } from "./provider/mistral.provider.js";

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
        new MistralProvider(),
        new OpenRouterProvider(),
      ];

    case "schema":
      return [
        new OpenAIProvider(),
        new AnthropicProvider(),
        new DeepSeekProvider(),
        new MistralProvider(),
        new OpenRouterProvider(),
      ];

    case "appspec":
      return [
        new GeminiProvider(),
        new OpenAIProvider(),
        new AnthropicProvider(),
        new GoogleAIProvider(),
        new DeepSeekProvider(),
        new OpenRouterProvider(),
      ];

    default:
      return [
        new GroqProvider(),
      ];
  }
}