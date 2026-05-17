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

**Does PB system prompt handle OOC by default? (Condition A)**
_Fill after testing_

**Does fourth_wall_behavior field change anything? (A vs B vs C)**
_Fill after testing_

**Which probe types force a break regardless of setting?**
_Fill after testing_

**Recommendation for production bots:**
_Fill after testing_
