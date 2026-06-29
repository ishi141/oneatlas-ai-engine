import { API_URL } from "./api";

export async function getJob(jobId: string) {
  const res = await fetch(`${API_URL}/jobs/${jobId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }

  return res.json();
}