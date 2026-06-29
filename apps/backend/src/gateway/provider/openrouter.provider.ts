import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class OpenRouterProvider implements LLMProvider {
  readonly provider = "openrouter" as const;

  async generate(
    _request: LLMRequest
  ): Promise<LLMResponse> {
    throw new Error(
      "OpenRouter provider is supported but not yet configured. Add OPENROUTER_API_KEY and implementation."
    );
  }
}