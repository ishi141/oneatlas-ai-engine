import { LLMProvider, LLMRequest, LLMResponse } from "./types.js";

export class LLMClient {
  constructor(private provider: LLMProvider) {}

  async generate(request: LLMRequest): Promise<LLMResponse> {
    const start = Date.now();

    const result = await this.provider.generate(request);

    return {
      ...result,
      latency: Date.now() - start,
    };
  }
}