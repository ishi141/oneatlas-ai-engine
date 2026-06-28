import Groq from "groq-sdk";

import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class GroqProvider implements LLMProvider {
  readonly provider = "groq" as const;

  async generate(
    request: LLMRequest
  ): Promise<LLMResponse> {

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY not found");
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const start = Date.now();

    const response =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",

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

      model: "llama-3.3-70b-versatile",

      output:
        response.choices[0].message.content ?? "",

      latency: Date.now() - start,
    };
  }
}