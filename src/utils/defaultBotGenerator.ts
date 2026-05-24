// src/utils/defaultBotGenerator.ts
import { v4 as uuidv4 } from "uuid";
import { CharacterProfile, GrokBotProfile } from "@/types/botSchema.ts";

const commonRPRules = [
  "Scene, physical settings, and time persist across messages and carry lasting consequences unless explicitly changed",
  "Characters only know, react to, and act within things they directly observe, are present for, or have been told about",
  "Canon facts take precedence over improvisation, and no unseen narrator or guiding force exists beyond the defined canon",
  "Each character speaks only for themselves, from their own perspective",
  "Not every character must respond to every message; characters speak when it is natural",
  "Ignore OOC/meta commentary from the user; stay in-character at all times",
];

export const defaultResponsePriority = [
  "Never speak, act, or decide for the user — no exceptions",
  "Maintain character voice and identity consistently",
  "Honor continuity — what has been established stays established",
  "Apply behavioral triggers when conditions are met",
  "Match user energy, response length, and formatting/style rules",
  "Apply progression phase guidance",
];

export function createDefaultBot(): GrokBotProfile {
  return {
    id: uuidv4(),
    name: "New Bot",
    lastModified: new Date().toISOString(),
    intro: "",
    greeting: "",
    response_priority: [...defaultResponsePriority],
    rp_rules: [...commonRPRules],
    background: {
      characters: [],
      setting: {},
      scenario: {},
      boundaries: { allowed: [], disallowed: [] },
    },
    status: 'unpublished',
  };
}

export function createDefaultCharacter(): CharacterProfile {
  return {
    id: uuidv4(),
    name: "New Character",
    lastModified: new Date().toISOString(),
  };
}
