import OpenAI from "openai";

import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class OpenAIProvider implements LLMProvider {
  readonly provider = "openai" as const;

  async generate(
    request: LLMRequest
  ): Promise<LLMResponse> {

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not found");
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const start = Date.now();

    const response =
      await client.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "system",
            content: request.systemPrompt ?? "",
          },
          {
            role: "user",
            content: request.userPrompt,
          },
        ],

        temperature: request.temperature ?? 0.2,
      });

    return {
      provider: this.provider,

      model: "gpt-4o-mini",

      output:
        response.choices[0].message.content ?? "",

      latency: Date.now() - start,
    };
  }
}