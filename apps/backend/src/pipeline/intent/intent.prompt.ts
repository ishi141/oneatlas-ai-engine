export function buildIntentPrompt(userPrompt: string): string {
  return `
You are an AI software architect.

Extract the following information from the user's prompt.

Return ONLY valid JSON.

Required fields:

{
  "appName": "",
  "appType": "",
  "features": [],
  "entities": [],
  "integrations_requested": [],
  "assumptions": []
}

User Prompt:

${userPrompt}
`;
}