import Anthropic from "@anthropic-ai/sdk";

import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class AnthropicProvider implements LLMProvider {
  readonly provider = "anthropic" as const;

  async generate(
    request: LLMRequest
  ): Promise<LLMResponse> {

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY not found");
    }

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const start = Date.now();

    const response =
      await client.messages.create({
        model: "claude-3-5-sonnet-latest",

        max_tokens: request.maxTokens ?? 2048,

        system: request.systemPrompt ?? "",

        messages: [
          {
            role: "user",
            content: request.userPrompt,
          },
        ],
      });

    const output = response.content
      .filter((x) => x.type === "text")
      .map((x) => x.text)
      .join("");

    return {
      provider: this.provider,

      model: "claude-3-5-sonnet-latest",

      output,

      latency: Date.now() - start,
    };
  }
}