import { integrationRegistry } from "./registry.js";

export function getIntegrations() {

  return integrationRegistry;

}

export function findIntegration(
  id: string
) {

  return integrationRegistry.find(
    i => i.id === id
  );

}