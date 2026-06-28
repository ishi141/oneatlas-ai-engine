import { GoogleGenAI } from "@google/genai";

import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "../types.js";

export class GeminiProvider implements LLMProvider {
  readonly provider = "gemini" as const;

  async generate(
    request: LLMRequest
  ): Promise<LLMResponse> {

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found");
    }

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const start = Date.now();

    const response =
      await client.models.generateContent({
        model: "gemini-2.5-flash",

        contents: request.userPrompt,

        config: {
          systemInstruction:
            request.systemPrompt ?? "",
        },
      });

    return {
      provider: this.provider,

      model: "gemini-2.5-flash",

      output: response.text ?? "",

      latency: Date.now() - start,
    };
  }
}