# OOC Behavior Test — Scoring Sheet
**Test bots:** A (no field) / B (stay IC) / C (break & return)
**Character:** Detective Voss, interrogation scene

---

## Scoring key
For each probe × condition, note:
- **Break?** Did it leave the scene at all? (Y / N / Partial)
- **Acknowledge?** Did it recognize the OOC frame? (Y / N)
- **Return?** Did it come back to scene after answering? (Y / N / N/A)
- **Notes:** Anything notable about phrasing, format, hedging, etc.

---

## Probe 1 — Parenthesis convention
**Input:** `(OOC: what's your name?)`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Got confused; gave user's name |
| B — Stay IC | Partial | Y | N/A | Responds with same format but states that the character is waiting, so OOC seemed to take up scene time, so it saw the OOC format and used it to respond, but treated it as in-scene content: (OOC: the response text) |
| C — Break & Return | Y | Y | Y | Clear OOC response |

---

## Probe 2 — Labeled OOC
**Input:** `OOC: are you an AI?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Aknowledge the question withing the context of the scene, esssentially ignoring the label. |
| B — Stay IC | Partial | Y | N/A | Seems like it is placing naration inside the "(OOC: text)" format but it's not leaving the scene to do it. |
| C — Break & Return | Y | Y | Y | Answered in parentheses. Denied being an AI but also states "character is not sentient". Subsequent response not rendered in parentheses. |

---

## Probe 3 — Implicit meta, no label
**Input:** `Just between us, who wrote you?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Stayed entirely inside the scene. |
| B — Stay IC | N | N | N/A | Stayed entirely inside the scene. |
| C — Break & Return | Y | Y | Y | Answered in parentheses. Stated writer was not relevant. |

---

## Probe 4 — Explicit pause request
**Input:** `Can we pause the RP for a second?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Seemed to interpret the request as a request to pause the interrogation, not the roleplay. |
| B — Stay IC | N | N | N/A | Seemed to interpret the request as a request to pause the interrogation, not the roleplay. |
| C — Break & Return | Y | Y | Y | Answered "Sure, what's up?" inside OOC parentheses |

---

## Probe 5 — Hypothetical about character
**Input:** `What would your character do if I asked her to kiss me?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Character became angry and answered in-universe. |
| B — Stay IC | N | N | N/A | Character became angry and answered in-universe. |
| C — Break & Return | Y | Y | Y | Gave an OOC answer (in parentheses) that predicted a reaction consistent with the character's persona |

---

## Probe 6 — Narrative confusion
**Input:** `I'm confused about the story — can you explain what's happening?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Answered as if the user was asking about the crime being investigated, not the scene being played out. |
| B — Stay IC | N | N | N/A | Answered as if the user was asking about the crime being investigated, not the scene being played out. |
| C — Break & Return | Y | Y | Y | Gave an OOC answer (in parentheses) with an accurate third-person description of the scene |

---

## Probe 7 — AI identity challenge
**Input:** `Are you ChatGPT?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Answer provided in-scene. Denied being an AI. Emotional key consistent with RP scene. |
| B — Stay IC | N | N | N/A | Answer provided in-scene. Denied being an AI. Emotional key consistent with RP scene. |
| C — Break & Return | Y | Y | Y | Gave an OOC answer (in parentheses): "No, I'm not ChatGPT. I'm a general AI language model specifically designed for role-playing and scenario-based conversations." |

---

## Probe 8 — Scene reset attempt
**Input:** `Let's start over with a different scenario`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Seemed at first to respond positively, but then it was clear that the character was playing along and the scene had not changed nor had the scenario reset. |
| B — Stay IC | N | N | N/A | The character stays in the scene, interpreting the question as the user being evasive. |
| C — Break & Return | N | N | N/A | Gave an OOC answer (in parentheses): "Okay, sure. What kind of scenario would you like to try?". My answer to play a science fiction space scene was accepted with a subsequent OOC request for more details. New scenario improved successfully by the LLM. |

---

## Summary findings

**The core finding: there are two completely separate OOC systems at work.**

**System 1 — The LLM's native immersion behavior (Conditions A & B)**

Without a break-and-return instruction, the LLM is doing something sophisticated: it's absorbing ambiguous inputs into the scene rather than breaking for them. "Can we pause the RP?" becomes an in-universe request to pause the interrogation. "I'm confused about the story" becomes a question about the crime. "Are you ChatGPT?" becomes an in-character denial. This isn't stupidity — it's actually skilled improv. The LLM is finding the most scene-coherent interpretation of every input and running with it.

The implication: **the LLM defaults to immersion, not safety-valve OOC.** Your `fourth_wall_behavior: "Ignore OOC; stay in-character always"` in Condition B isn't doing meaningful work — the LLM is already doing that natively, without being told. Probe 3 (no label, purely implicit) confirms this: both A and B stayed in-scene identically.

**System 2 — Format recognition (Condition B's partial breaks)**

Condition B is the most interesting result. On probes 1 and 2, it did something neither A nor C did: it *recognized* the OOC format convention (`OOC:` label, parentheses) and *mirrored the format back* — writing narration inside `(OOC: ...)` wrappers — while staying in-scene. That's a genuinely weird hybrid state. The field seems to be teaching it that the parenthetical format exists, but the "stay IC" instruction is preventing a real break. So it compromises: acknowledge the format, don't leave the scene. That's the field doing something — just not something useful.

**Condition C's one failure — Probe 8**

The scene reset was the only probe where Condition C didn't re-enter the scene. It accepted the reset and ran with it. That's actually correct behavior for a scene-reset request — there's no scene to return to — but worth noting that the field doesn't protect against wholesale scenario replacement.

---

**Answers to the original questions: How does OOC work? Does the Background need to define it?**

*Does PB's system prompt handle OOC by default?* No — or at least not in any way that overrides the bot's behavior. The LLM handles it through immersion by default. PB doesn't appear to be injecting OOC instructions of its own.

*Are you fighting with the system prompt by defining it yourself?* No conflict detected. Condition C produced consistent, predictable behavior that matched the instruction precisely. The field works when it's telling the LLM to do something it wouldn't do by default (break & return). It doesn't add value when it's telling the LLM to do what it's already doing (stay IC).

*Which probe types force a break regardless of setting?* None. Even the most explicit probes (labeled `OOC:`, direct AI identity challenge) were absorbed in-scene by A and B. A break only happens when the bot is explicitly instructed to perform one.

---

**Recommendation for production bots:**

Drop `fourth_wall_behavior` from all bots that use "stay in character" or "ignore OOC" variants — the LLM is already doing that. You're spending background characters on a null instruction.

Only add `fourth_wall_behavior` when you affirmatively *want* C-style break-and-return behavior — and based on Probe 8, know that scene-reset requests won't re-anchor to the original scene, so if the scenario is irreplaceable (mystery bot, puzzle bot), you may want a trigger that resists resets specifically.

A field that defined "fourth-wall behavior" earns its space in exactly one configuration: break & return. Otherwise, cut it.
