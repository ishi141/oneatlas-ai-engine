export interface EvaluationResult {

  prompt: string;

  success: boolean;

  latency: number;

  provider: string;

  repaired: boolean;

  error?: string;

}
