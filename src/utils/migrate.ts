import type {
  CharacterProfile,
  DialogLineBlock,
  GrokBotProfile,
  ProgressionPhase,
} from "@/types/botSchema";

/**
 * Current schema version stamp written on save. Bots with an older or absent
 * stamp are run through `migrateLegacyFields` on load.
 */
export const CURRENT_SCHEMA_VERSION = "4";

type LegacyPhase = {
  shift_type?: "Phase" | "Narrative" | "Tone";
  from_message?: number;
  to_message?: number;
  description?: string;
} & Partial<ProgressionPhase>;

function bucket(from: number | undefined): ProgressionPhase["phase"] {
  if (from == null || from <= 5) return "early";
  if (from <= 20) return "mid";
  return "late";
}

function migrateOnePhase(p: LegacyPhase): ProgressionPhase {
  if (p.phase) return p as ProgressionPhase;

  const { shift_type, from_message, to_message: _to, description, ...rest } = p;
  return {
    ...rest,
    phase: bucket(from_message),
    category: shift_type,
    description: description ?? "",
  };
}

/**
 * Convert legacy numeric progression phases into the new phase/cue/category
 * shape. Mutates the bot in place. Idempotent.
 */
export function migrateProgressionPhases(bot: GrokBotProfile): void {
  const chars = bot.background?.characters;
  if (!chars?.length) return;
  for (const char of chars) {
    if (!char.progression_phases?.length) continue;
    char.progression_phases = char.progression_phases.map(migrateOnePhase);
  }
}

const LEGACY_SLOT_KEYS = [
  "example_0",
  "example_1",
  "example_2",
  "example_3",
] as const;

/**
 * Convert legacy fixed-slot dialog_examples ({example_0..example_3}) into a
 * dynamic array. Empty slots are dropped. Variant overrides that targeted a
 * specific slot are rewritten to point at the new array index; overrides that
 * targeted an empty source slot are dropped.
 *
 * Mutates the bot in place. Idempotent — already-migrated arrays pass through.
 */
export function migrateDialogExamples(bot: GrokBotProfile): void {
  const chars = bot.background?.characters;
  if (!chars?.length) return;

  for (const char of chars) {
    const remap = migrateOneCharacter(char);
    if (!remap) continue;
    if (!bot.variants) continue;
    rewriteVariantPaths(bot, char.id, remap);
  }
}

/** Returns the old-slot-index → new-array-index remap if migration ran, else null. */
function migrateOneCharacter(char: CharacterProfile): Map<number, number> | null {
  const de = char.dialog_examples as unknown;
  if (!de) return null;
  if (Array.isArray(de)) return null; // already migrated

  const obj = de as Record<string, DialogLineBlock[] | undefined>;
  const compacted: DialogLineBlock[][] = [];
  const remap = new Map<number, number>();

  for (let oldIdx = 0; oldIdx < LEGACY_SLOT_KEYS.length; oldIdx++) {
    const lines = obj[LEGACY_SLOT_KEYS[oldIdx]];
    if (Array.isArray(lines) && lines.length > 0) {
      remap.set(oldIdx, compacted.length);
      compacted.push(lines);
    }
  }

  char.dialog_examples = compacted;
  return remap;
}

function rewriteVariantPaths(
  bot: GrokBotProfile,
  charId: string,
  remap: Map<number, number>,
): void {
  if (!bot.variants) return;
  for (const ovBlock of Object.values(bot.variants)) {
    const next: typeof ovBlock.character_overrides = [];
    for (const co of ovBlock.character_overrides) {
      if (co.character_id !== charId) {
        next.push(co);
        continue;
      }
      const m = co.field_path.match(/^dialog_examples\.example_(\d+)(.*)$/);
      if (!m) {
        next.push(co);
        continue;
      }
      const oldIdx = parseInt(m[1], 10);
      const tail = m[2];
      const newIdx = remap.get(oldIdx);
      if (newIdx === undefined) continue; // pointed at an empty source slot — drop
      next.push({ ...co, field_path: `dialog_examples.${newIdx}${tail}` });
    }
    ovBlock.character_overrides = next;
  }
}

/**
 * Translate legacy schema-v3 (and earlier) field shapes into schema-v4.
 *
 * Translation matrix (all idempotent):
 *   flags                                  → dropped (was already deprecated)
 *   imagesCount                            → dropped (derive from images.length)
 *   profileUrl                             → dropped (runtime-computed object URL)
 *   background.setting.era                 → folded into background.setting.location
 *   background.setting.city                → folded into background.setting.location
 *   background.meta.fourth_wall_behavior   → appended to rp_rules as "Fourth-wall: …"
 *   background.meta.continuity_rules       → appended to rp_rules as a bullet
 *   background.meta                        → removed once both sub-fields are absorbed
 *   character.overview                     → moved to role if role empty;
 *                                              else prepended to backstory;
 *                                              dropped if both filled and non-empty
 *   character.behavior_rules.boundaries    → entries pushed into character_anchors
 *   character.behavior_rules.disallowed_scenes → entries pushed into character_anchors
 *   character.behavior_rules.dialect_or_accent → appended to speech_style with a space
 *
 * Variant overrides whose `field_path` targets a removed/renamed leaf are
 * dropped silently — the variants feature is rarely used and rewriting
 * prose-merge paths is not meaningful.
 *
 * Mutates the bot in place. Idempotent — already-v4 bots pass through.
 */
export function migrateLegacyFields(bot: GrokBotProfile): void {
  const b = bot as any;

  delete b.flags;
  delete b.imagesCount;
  delete b.profileUrl;

  const setting = b.background?.setting;
  if (setting) {
    const era = trimOrEmpty(setting.era);
    const city = trimOrEmpty(setting.city);
    if (era || city) {
      const loc = trimOrEmpty(setting.location);
      const extras = [city, era].filter(Boolean).join(", ");
      setting.location = loc ? `${loc} — ${extras}` : extras;
    }
    delete setting.era;
    delete setting.city;
  }

  const meta = b.background?.meta;
  if (meta) {
    const fw = trimOrEmpty(meta.fourth_wall_behavior);
    const cont = trimOrEmpty(meta.continuity_rules);
    if (fw || cont) {
      if (!Array.isArray(bot.rp_rules)) bot.rp_rules = [];
      if (fw) bot.rp_rules.push(`Fourth-wall handling: ${fw}`);
      if (cont) bot.rp_rules.push(cont);
    }
    delete b.background.meta;
  }

  const chars = b.background?.characters as any[] | undefined;
  if (Array.isArray(chars)) {
    for (const char of chars) migrateCharacterLegacyFields(char);
  }

  pruneDeadVariantOverrides(b);

  b.schema_version = CURRENT_SCHEMA_VERSION;
}

function migrateCharacterLegacyFields(char: any): void {
  const overview = trimOrEmpty(char.overview);
  if (overview) {
    const role = trimOrEmpty(char.role);
    if (!role) {
      char.role = overview;
    } else {
      const backstory = trimOrEmpty(char.backstory);
      char.backstory = backstory ? `${overview}\n\n${backstory}` : overview;
    }
  }
  delete char.overview;

  const br = char.behavior_rules;
  if (br) {
    const carryovers: string[] = [];
    const boundaries = trimOrEmpty(br.boundaries);
    if (boundaries) carryovers.push(boundaries);
    if (Array.isArray(br.disallowed_scenes)) {
      for (const entry of br.disallowed_scenes) {
        const t = trimOrEmpty(entry);
        if (t) carryovers.push(t);
      }
    }
    if (carryovers.length) {
      if (!Array.isArray(char.character_anchors)) char.character_anchors = [];
      char.character_anchors.push(...carryovers);
    }
    delete br.boundaries;
    delete br.disallowed_scenes;

    const dialect = trimOrEmpty(br.dialect_or_accent);
    if (dialect) {
      const speech = trimOrEmpty(br.speech_style);
      br.speech_style = speech ? `${speech} ${dialect}` : dialect;
    }
    delete br.dialect_or_accent;
  }
}

const DEAD_BOT_PATHS = new Set([
  "flags",
  "imagesCount",
  "profileUrl",
  "background.setting.era",
  "background.setting.city",
  "background.meta",
  "background.meta.fourth_wall_behavior",
  "background.meta.continuity_rules",
]);

const DEAD_CHAR_PATH_PREFIXES = [
  "overview",
  "behavior_rules.boundaries",
  "behavior_rules.dialect_or_accent",
  "behavior_rules.disallowed_scenes",
];

function pruneDeadVariantOverrides(bot: any): void {
  const variants = bot.variants;
  if (!variants || typeof variants !== "object") return;
  for (const block of Object.values<any>(variants)) {
    if (Array.isArray(block?.bot_overrides)) {
      block.bot_overrides = block.bot_overrides.filter(
        (o: any) => !DEAD_BOT_PATHS.has(o?.field_path),
      );
    }
    if (Array.isArray(block?.character_overrides)) {
      block.character_overrides = block.character_overrides.filter(
        (o: any) =>
          !DEAD_CHAR_PATH_PREFIXES.some(
            (p) => o?.field_path === p || o?.field_path?.startsWith(`${p}.`),
          ),
      );
    }
  }
}

function trimOrEmpty(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Run all idempotent migrations on a bot in place. Safe to call on
 * already-modern bots.
 */
export function normalizeBot(bot: GrokBotProfile): void {
  migrateProgressionPhases(bot);
  migrateDialogExamples(bot);
  migrateLegacyFields(bot);
}
