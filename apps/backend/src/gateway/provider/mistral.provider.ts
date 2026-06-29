import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class MistralProvider implements LLMProvider {
  readonly provider = "mistral" as const;

  async generate(
    _request: LLMRequest
  ): Promise<LLMResponse> {
    throw new Error(
      "Mistral provider is supported but not yet configured. Add MISTRAL_API_KEY and implementation."
    );
  }
}