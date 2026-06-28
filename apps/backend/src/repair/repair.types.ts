export interface RepairResult<T> {
  repaired: boolean;
  strategy: string;
  attempts: number;
  data: T;
}

export interface RetryOptions {
  maxRetries: number;
}