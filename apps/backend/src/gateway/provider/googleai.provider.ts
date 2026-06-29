import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class GoogleAIProvider implements LLMProvider {
  readonly provider = "googleai" as const;

  async generate(
    _request: LLMRequest
  ): Promise<LLMResponse> {
    throw new Error(
      "Google AI provider is supported but not yet configured. Add GOOGLE_AI_API_KEY and implementation."
    );
  }
}