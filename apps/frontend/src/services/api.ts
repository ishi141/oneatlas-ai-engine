export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api/v1";

export interface GeneratePayload {
  prompt: string;
  provider: string;
}

export interface GenerateResponse {
  jobId: string;
}

export interface Cost {
  totalCost: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalLatency: number;
}

export interface JobResult {
  intent?: Record<string, unknown>;
  schema?: Record<string, unknown>;
  appSpec?: {
    integrations?: {
      provider?: string;
      name?: string;
      type?: string;
    }[];
    [key: string]: unknown;
  };
  validation?: Record<string, unknown>;
  repairLog?: unknown[];
  [key: string]: unknown;
}

export interface JobResponse {
  data: {
    id: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    completedAt?: string;

    cost?: Cost;

    repairLog?: unknown[];

    result: JobResult;
  };
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    }
  );

  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const error = await response.json();

      message =
        error?.message ??
        error?.error ??
        message;
    } catch {}

    throw new Error(message);
  }

  return response.json();
}

export function generateApplication(
  payload: GeneratePayload
) {
  return request<GenerateResponse>(
    "/generate",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

export function getJob(jobId: string) {
  return request<JobResponse>(
    `/jobs/${jobId}`
  );
}

export function healthCheck() {
  return request<{
    status: string;
  }>("/health");
}