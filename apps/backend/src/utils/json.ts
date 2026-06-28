export function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export function extractJson(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    return text;
  }

  return text.substring(start, end + 1);
}

export function repairMalformedJson(text: string): string {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\r/g, "")
    .trim();
}

export function parseLLMJson<T>(text: string): T {
  const repaired = repairMalformedJson(text);

  const extracted = extractJson(repaired);

  const parsed = safeJsonParse<T>(extracted);

  if (!parsed) {
    throw new Error("Unable to parse LLM JSON response");
  }

  return parsed;
}