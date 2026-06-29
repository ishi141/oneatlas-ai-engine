import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class DeepSeekProvider implements LLMProvider {
  readonly provider = "deepseek" as const;

  async generate(
    _request: LLMRequest
  ): Promise<LLMResponse> {
    throw new Error(
      "DeepSeek provider is supported but not yet configured. Add DEEPSEEK_API_KEY and implementation."
    );
  }
}