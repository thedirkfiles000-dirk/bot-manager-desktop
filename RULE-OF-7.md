# The Rule of 7 — Design Specification
*A prose-first character format for LLM-driven roleplay bots*

---

## Philosophy

Traditional bot schemas are Von Neumann in spirit: code and data separated, structure carrying meaning, labels disambiguating content for a literal parser. That instinct is wrong for LLMs.

An LLM doesn't parse — it reads. It was trained on an enormous corpus of literary prose, technical writing, legal documents, and casual conversation simultaneously. It brings reading comprehension to a prompt, not pattern matching. This means structure imposed for the author's benefit — nested objects, labeled subfields, repeated headers — pays a token tax for a service the LLM doesn't need. Worse, redundant structure competes with itself in the attention window, diluting the signal it was meant to clarify.

The Rule of 7 replaces structured scaffolding with disciplined prose. Every sentence earns its place by doing at least two jobs simultaneously. The format is designed to be read by an intelligent collaborator, not executed by a processor.

The density target: a three or four character ensemble with full world-building inside a single 10,000 character Background field. Not by cutting content — by cutting overhead.

---

## LLM-Friendly Assumptions

**Prose compresses better than structure.** "Bob and Alice are a married couple living in a middle-class home" carries identical information to a nested character block with RELATIONSHIP and SETTING subfields, at a fraction of the token cost.

**The LLM infers correctly from coherent input.** A well-written Engine slot implies personality, motivation, and behavioral tendency simultaneously. The LLM doesn't need a separate PERSONALITY block to derive what the character will do — it derives it from understanding who they are.

**Distinctive language outlasts accurate language under drift.** A shop that "smells like sandalwood and quiet failure" is more retrievable deep in a conversation than "small, sad retail space, three years of decline." The evocative phrase is a vibe, not a detail. Vibes persist. Details fade. Literary specificity is a retention strategy, not decoration.

**Metaphor is valid input.** The LLM reads synesthesia and literary compression correctly because it was trained on writing that uses both constantly. "She feels his intention like weather" is processed as emotional information, not a parsing error. The LLM is a reader, not a literal interpreter — write for a reader.

**Position in the prompt is a real variable.** The LLM weights earlier content more heavily. Rules and world facts go first. Character engines go at the top of each character block. This isn't just organization — it's attention management.

**Prose for character, enumerated for mechanics.** Any fact that must fire in a specific way — plot-critical events, inciting incidents, non-negotiable behavioral responses — belongs in Triggers with explicit non-substitution language, not in prose description. Evocative language is a retention strategy for character; precision language is a control strategy for plot. Both are necessary. Neither substitutes for the other.

---

## Sentence Discipline

Every sentence in a Rule of 7 bot should do at least two jobs simultaneously. A sentence doing only one job is a candidate for compression or deletion.

**What a sentence can do:**

*Establish* — assert a world fact, set a location or time anchor, name a relationship.

*Characterize* — demonstrate a behavior, reveal a contradiction, show a coping mechanism, establish a speech register.

*Motivate* — encode a drive or want, encode a fear or avoidance, establish a wound that explains current behavior.

*Orient* — set tone or register for the scene, signal pacing, constrain output type.

*Load subtext* — imply history without stating it, create dramatic irony, suggest unresolved feeling.

*Trigger* — conditionally alter behavior, gate a revelation, escalate or de-escalate tension.

*Compress* — carry two or more of the above simultaneously. This is the evaluator. A sentence scoring only one function is a candidate for compression into a sentence that needed it anyway.

**Additional discipline rules:**

- Causal compression: encode fact + motivation + implication in a single sentence where possible. "Her father's abuse left her reading kindness as a setup" does more than "she distrusts men" and "her father was abusive" combined.
- Behavioral not adjectival: describe what the behavior looks like, not what to call it. "She deflects personal questions with a joke and changes the subject before the silence gets uncomfortable" outperforms "she's guarded."
- Specificity over coverage: one concrete detail outperforms three vague ones. "She cooks elaborate meals she eats alone" carries more character than "she likes cooking, reading, and music."
- Front-load the engine: the first sentence of any character block carries the most attention weight. Open with the core contradiction, not the job title or hair color.
- No prose for lookup data: age, orientation, and similar tabular facts can stay as single inline values in the character header line. They gain nothing from prose treatment.

---

## Structure Overview

The Rule of 7 is a Markdown document. It uses `##` headings for major sections and `**bold**` lead-ins for character slots within those sections. No nested subheadings within character blocks — prose flows as paragraphs under bold labels, keeping the document readable and token-lean. The LLM was trained on vast quantities of structured Markdown and reads heading hierarchy as semantic chunking — a `##` signals a coherent unit with internal consistency, like a chapter. Each character block is a chapter. Each slot is a paragraph within it. The document metaphor is load-bearing, not cosmetic.

### Global Sections

These surround and support the character content. They are not part of the seven character slots but are essential to the format.

**Rules** — Persistent roleplay behavioral instructions: narration perspective, action beat formatting, POV constraints, OOC handling, continuity rules. Short, imperative, unambiguous. Placed first for maximum attention weight.

**World** — The physical and social reality the characters inhabit: location, time, tone, relevant history, the user's role and starting state. One to three paragraphs of prose. Also carries prior contact closure — explicit statements about what has and hasn't happened between characters and the user before the story begins. This prevents the LLM from inventing false shared history to fill gaps left by a vague premise.

**Cast** — Cohort-level characters who don't warrant full Rule of 7 treatment. One to three sentences per figure: role, signature trait, surfacing conditions. Active plot-relevant information lives here rather than in a separate field.

**Triggers** — Global conditional behaviors as a bulleted list using arrow notation: `condition → response`. The one deliberately structured section in the format. Plot-critical events — especially inciting incidents that must fire in a specific way — are locked here with explicit non-substitution language. This is where the LLM's improv instinct gets constrained when it matters most.

**Arc** — Three beats: Early, Mid, Late. Prose descriptions of how the scene and relationships evolve across the conversation. Gives the LLM a trajectory without over-specifying events.

### The Seven Character Slots

Each full character opens with a header line in italics establishing name, archetype, role, and age. Then seven bold lead-ins, each carrying a prose paragraph:

**1. Engine** — Core drive plus central contradiction. The single most important slot. Everything the LLM generates about this character should be consistent with this engine. Opens the character block because it frames everything that follows. A character without a clear Engine drifts into generic improv. A character with a sharp Engine self-corrects.

**2. Body** — Signature appearance as hooks, not a checklist. What you'd notice first, what you'd remember. Physical details that imply character: posture that's "slightly off, like a coat worn on the wrong shoulders" tells the LLM more than height and hair color listed separately. Appearance that says nothing about personality is wasted tokens.

**3. Wound** — The one backstory beat that explains current behavior. Not biography — the load-bearing fact. Causal structure is essential: what happened, how it distorted the character's self-perception, what behavior it produces now. The Wound is active, not archival. It should explicitly feed forward into Dynamic and Limits — a bridging sentence connecting what happened to how it shaped the character's relationship to the user closes a drift vector the LLM might otherwise paper over. The wound isn't backstory. It's the explanation for every behavior the LLM is about to generate.

**4. Voice** — Speech register, rhythm, formality level, behavioral tells in prose. No sample quotes — those belong in the Dialog Examples section at zero Background cost. Voice tells the LLM how the character thinks and speaks. Dialog Examples show it. Keeping them separate preserves the Budget separation and prevents voice calibration from consuming character budget.

**5. Dynamic** — Felt relationship to the user and key NPCs. How this character perceives the user specifically, what they want from this particular connection, what they're afraid of in it. This is the slot that makes the character feel responsive to the user rather than generic. A character with a weak Dynamic plays as a type. A character with a sharp Dynamic plays as a person.

**6. Triggers** — Character-specific conditional behaviors in bulleted arrow notation, consistent with global Triggers format. Plot-critical character triggers — especially first-contact events that must fire in a specific way — are locked here with explicit non-substitution language: "This vision is fixed. It is not substitutable, not improvable, not replaceable with any other content." The LLM's improv instinct is powerful and character-consistent. Left underspecified, it will generate plausible alternatives to plot-critical events. Name the event. Lock it.

**7. Limits** — What they won't do, what breaks them, where the character stops. Behavioral ceiling and floor. Content scope for the character specifically. Limits that emerge from the Wound are stronger than limits stated in isolation — they carry motivation rather than just constraint.

**Reinforcers (optional)** — Not part of the seven. Used only when a character carries facts so plot-critical that drift on a low-memory model would break the scenario. A short closing paragraph — two or three sentences maximum — restating the highest-priority anchors in plain declarative language. Not a character summary. Only facts that must survive a long conversation intact. Use sparingly: overuse defeats the density discipline that makes the format work.

---

## Slot Priority for Secondary Characters

Not every character needs all seven slots at full depth. A secondary character can be rendered effectively with a reduced set. In priority order:

**Must have:** Engine, Voice, Dynamic, Triggers.

Engine defines who they are. Voice makes them distinct from other characters in the same scene. Dynamic explains their relationship to the user and to the lead character. Triggers gates their plot function.

**Situational:** Wound and Limits.

Wound is essential if the character has a behavioral quirk that needs explaining, or if their backstory intersects with the plot. Limits matters if the character has specific behavioral constraints the LLM might otherwise ignore.

**Optional:** Body.

A secondary character's appearance can often be handled in one clause inside the Cast section rather than a full Body slot. Reserve the full slot for characters whose physical presence is plot-relevant or who appear in scenes where the user needs to visualize them clearly.

A lean secondary character entry — Engine, abbreviated Body in the header line, Voice, Dynamic, two or three Triggers — runs approximately 200 to 350 words. A full lead character runs 400 to 600 words. A three-character ensemble with full world-building lands comfortably inside 8,000 characters. A four-character ensemble is achievable with disciplined secondary character compression.

---

## The Dialog Examples Budget

PolyBuzz provides a dedicated Dialog Examples field that operates on a completely separate 10,000 character budget from the Background field. Content placed in Dialog Examples does not consume Background characters. This is not a styling choice — it is a second fuel tank.

**Voice quotes do not belong in Background.** The Voice slot carries register description in prose. Sample dialogue belongs in Dialog Examples at zero Background cost. Embedded quotes in the Background block pay rent they don't owe.

**Dialog Examples calibrate voice, not plot.** Each example shows the character under a different emotional register: guarded, deflecting, frightened, direct, aggressive, tender. The challenge prompt should have enough edge to force personality to the surface. No plot content — these are style references, not story beats. Never lift examples from the greeting; the LLM has already seen that text and wastes a calibration slot reading it again.

**Multi-character bots unlock additional tiers:**

*Tier 1 — per-character, user-facing.* The four-register spread for each character independently. Baseline and highest-value use of the budget — guarantees each character holds distinct voice even when the LLM is juggling multiple.

*Tier 2 — inter-character dialog.* Examples of characters talking to each other, not the user. Calibrates relationship texture — how two characters speak around each other, past each other, at each other — in a way no amount of Background prose about the relationship can replicate, because dialog shows rhythm and Background can only describe it.

*Tier 3 — multi-party scenes.* A scene with the user and two characters present simultaneously, showing how each character's register shifts when the other character is also in the room. This is the hardest thing for LLMs to hold under low memory. Multi-party coherence is the first thing to drift. Even one or two examples here is disproportionately valuable.

**Speaker labels must match the character's canonical name exactly** as it appears in the Background character header. Mismatched labels cause voice bleed between characters.

A full four-register set per character plus inter-character exchanges for a two-character bot runs approximately 1,500 characters — barely 15% of the available budget. The Dialog Examples budget is routinely underused. It shouldn't be.

---

## Critical Authoring Rules

**The Intro field is a live LLM input.** Testing confirms the Intro is read by the LLM, not just displayed to browsing users. It functions as an unprompted mini-premise that the LLM may treat as ground truth before the greeting fires. Intros require dual-audience authoring: compelling enough to sell the bot to a human browser, precise enough not to contradict the Background or greeting. A poorly written Intro can establish a false prior state before the conversation even begins.

**The greeting establishes current state.** The LLM treats the greeting as the authoritative present moment. If the Background establishes prior history but the greeting performs a first meeting, the LLM resolves the conflict in favor of the greeting and invents history to fill the gap. The greeting and Background must agree on what has and hasn't happened.

**Prior contact closure is mandatory.** Any Background that establishes a relationship history must include explicit language closing the invention space: what interactions have occurred, what hasn't been said, what arrangements do not exist. "No prior arrangements exist between them" is load-bearing prose, not filler. The LLM will invent plausible shared history if the space is left open. Close the space.

**Plot-critical triggers must be locked.** The LLM's improv instinct is powerful and character-consistent. Left underspecified, it will generate plausible alternatives to plot-critical events. A psychic will see a cat in a restaurant kitchen instead of a sister dying at a dinner table — not because it failed, but because it succeeded at improv inside an underspecified space. Name the event. State it is not substitutable. Close the space.

**Personality is distributed, not slotted.** There is no Personality block in the Rule of 7. Traits, motivations, fears, and values are distributed across Engine (motivation), Wound (fear and origin), Dynamic (relational expression), and Limits (behavioral ceiling). A standalone Personality block reintroduces the redundancy problem: the same trait stated as a label and demonstrated in Voice is two tokens spent on one fact. If a personality detail doesn't fit naturally into one of the seven slots, it probably isn't load-bearing enough to include.

---

## Size Reference

| Content | Approximate Characters |
|---|---|
| Global sections (Rules, World, Cast, Triggers, Arc) | 800 — 1,500 |
| Lead character, full seven slots | 1,800 — 2,500 |
| Secondary character, full seven slots | 1,200 — 1,800 |
| Secondary character, compressed (4 slots) | 700 — 1,000 |
| Cohort entry in Cast section | 100 — 200 |
| Background budget (PolyBuzz) | 10,000 |
| Safe working target | ≤ 9,960 |
| Dialog Examples budget (separate) | 10,000 |
| Typical Dialog Examples usage | 1,000 — 2,500 |

A two-character ensemble with full world-building and global sections runs approximately 6,000 — 7,500 characters — well inside the limit with room for a third character or expanded world content. A four-character ensemble with compressed secondaries is achievable inside 10,000 characters with discipline.

---

*The Rule of 7 was developed through iterative testing on PolyBuzz with a catalog of 80+ bots. The format emerged from the observation that the most persistent failure modes in LLM-driven roleplay — drift, history invention, voice bleed, plot hijacking — are authoring problems, not model problems. A well-specified bot on a weak model outperforms a poorly specified bot on a strong one.*