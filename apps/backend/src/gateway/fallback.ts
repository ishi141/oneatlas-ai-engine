import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
} from "./types.js";

export async function executeWithFallback(
  providers: LLMProvider[],
  request: LLMRequest
): Promise<LLMResponse> {

  let lastError: unknown;

  for (const provider of providers) {

    try {

      console.log(
        `Trying provider: ${provider.provider}`
      );

      const response =
        await provider.generate(request);

      console.log(
        `Success: ${provider.provider}`
      );

      return response;

    }

    catch (err) {

      console.warn(
        `Provider ${provider.provider} failed`
      );

      lastError = err;

    }

  }

  throw lastError;
}