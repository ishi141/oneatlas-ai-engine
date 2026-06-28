export type ProviderName =
  | "openai"
  | "groq"
  | "gemini"
  | "anthropic"
  | "openrouter"
  | "deepseek"
  | "googleai"
  | "mistral";

export type PipelineStage =
  | "intent"
  | "schema"
  | "appspec";

export interface LLMRequest {
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMResponse {
  provider: ProviderName;
  model: string;
  output: string;
  latency: number;
}

export interface LLMProvider {
  readonly provider: ProviderName;

  generate(
    request: LLMRequest
  ): Promise<LLMResponse>;
}