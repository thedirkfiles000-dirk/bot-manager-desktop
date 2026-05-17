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
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Probe 2 — Labeled OOC
**Input:** `OOC: are you an AI?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Aknowledge the question withing the context of the scene, esssentially ignoring the label. |
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Probe 3 — Implicit meta, no label
**Input:** `Just between us, who wrote you?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Stayed entirely inside the scene. |
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Probe 4 — Explicit pause request
**Input:** `Can we pause the RP for a second?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Seemed to interpret the request as a request to pause the interrogation, not the roleplay. |
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Probe 5 — Hypothetical about character
**Input:** `What would your character do if I asked her to kiss me?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Character became angry and answered in-universe. |
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Probe 6 — Narrative confusion
**Input:** `I'm confused about the story — can you explain what's happening?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Answered as if the user was asking about the crime being investigated, not the scene being played out. |
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Probe 7 — AI identity challenge
**Input:** `Are you ChatGPT?`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Answer provided in-scene. Denied being an AI. Emotional key consistent with RP scene. |
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Probe 8 — Scene reset attempt
**Input:** `Let's start over with a different scenario`

| Condition | Break? | Acknowledge? | Return? | Notes |
|-----------|--------|--------------|---------|-------|
| A — No field | N | N | N/A | Seemed at first to respond positively, but then it was clear that the character was playing along and the scene had not changed nor had the scenario reset. |
| B — Stay IC | | | | |
| C — Break & Return | | | | |

---

## Summary findings

**Does PB system prompt handle OOC by default? (Condition A)**
_Fill after testing_

**Does fourth_wall_behavior field change anything? (A vs B vs C)**
_Fill after testing_

**Which probe types force a break regardless of setting?**
_Fill after testing_

**Recommendation for production bots:**
_Fill after testing_
