# The Rule of 7 — Design Specification
*A prose-first character format for LLM-driven roleplay bots*

---

## Philosophy

Traditional bot schemas are Von Neumann in spirit: code and data separated, structure carrying meaning, labels disambiguating content for a literal parser. That instinct is wrong for LLMs.

An LLM doesn't parse — it reads. It was trained on an enormous corpus of literary prose, technical writing, legal documents, and casual conversation simultaneously. It brings reading comprehension to a prompt, not pattern matching. This means structure imposed for the author's benefit — nested objects, labeled subfields, repeated headers — pays a token tax for a service the LLM doesn't need. Worse, redundant structure competes with itself in the attention window, diluting the signal it was meant to clarify.

The Rule of 7 replaces structured scaffolding with disciplined prose. Every sentence earns its place by increasing predictive power — reducing uncertainty about how the character will behave in future generations. The format is designed to be read by an intelligent collaborator, not executed by a processor.

The density target: a three or four character ensemble with full world-building inside a single 10,000 character Background field. Not by cutting content — by cutting overhead.

The central optimization criterion — reduce uncertainty about future generations — maps onto information encoding principles that extend beyond bot authoring. Rule of 7 may be a specific instance of a more general strategy for communicating with probabilistic language models: compress multiple constraints per unit of context, avoid redundant encoding, and write at the level of abstraction that survives drift. That claim is not required to use the format effectively, but it suggests the principles here generalize beyond PolyBuzz and beyond roleplay.

---

## LLM-Friendly Assumptions

**Prose compresses better than structure.** "Bob and Alice are a married couple living in a middle-class home" carries identical information to a nested character block with RELATIONSHIP and SETTING subfields, at a fraction of the token cost. The exception: genuine lookup data — age, orientation, and similar fixed values — can stay structured. They gain nothing from prose treatment and lose nothing from a label. The principle is prose for character, structure for lookup, enumeration for mechanics.

**The LLM infers correctly from coherent input.** A well-written Engine slot implies personality, motivation, and behavioral tendency simultaneously. The LLM doesn't need a separate PERSONALITY block to derive what the character will do — it derives it from understanding who they are.

**Distinctive language outlasts accurate language under drift.** A shop that "smells like sandalwood and quiet failure" is more retrievable deep in a conversation than "small, sad retail space, three years of decline." The evocative phrase is a vibe, not a detail. Vibes persist. Details fade. Literary specificity is a retention strategy, not decoration. High-level facts survive long conversations. Low-level facts drift. Write at the level of abstraction that survives.

**Metaphor is valid input.** The LLM reads synesthesia and literary compression correctly because it was trained on writing that uses both constantly. "She feels his intention like weather" is processed as emotional information, not a parsing error. The LLM is a reader, not a literal interpreter — write for a reader.

**High-priority instructions benefit from early placement.** Rules and world facts go first. Character engines go at the top of each character block. Early placement reduces competition with later narrative detail — a practical heuristic rather than a guarantee. See the Technical Appendix for nuance on how modern models handle positional priority.

**Prose for character, enumerated for mechanics.** Any fact that must fire in a specific way — plot-critical events, inciting incidents, non-negotiable behavioral responses — belongs in Triggers with explicit language making alternatives statistically unattractive, not in prose description. Evocative language is a retention strategy for character; precision language is a control strategy for plot. Both are necessary. Neither substitutes for the other.

---

## Sentence Discipline

Every sentence in a Rule of 7 bot should increase predictive power — reducing uncertainty about how the character will think, speak, and act in future generations. A sentence that doesn't constrain future output is a candidate for compression or deletion.

**What a sentence can do:**

*Establish* — assert a world fact, set a location or time anchor, name a relationship.

*Characterize* — demonstrate a behavior, reveal a contradiction, show a coping mechanism, establish a speech register.

*Motivate* — encode a drive or want, encode a fear or avoidance, establish a wound that explains current behavior.

*Orient* — set tone or register for the scene, signal pacing, constrain output type.

*Load subtext* — imply history without stating it, create dramatic irony, suggest unresolved feeling.

*Trigger* — conditionally alter behavior, gate a revelation, escalate or de-escalate tension.

*Compress* — carry two or more of the above simultaneously. This is the evaluator. A sentence scoring only one function is a candidate for compression into a sentence that needed it anyway.

**The predictive power test:** compare these two sentences:

> Sarah is shy.

versus

> Sarah laughs too quickly, then apologizes for laughing.

The second teaches personality, dialogue rhythm, emotional state, insecurity, and likely future behavior in one sentence. Every future generation the LLM produces for Sarah is now more constrained. That's the target.

**Additional discipline rules:**

- Causal compression: encode fact + motivation + implication in a single sentence where possible. "Her father's abuse left her reading kindness as a setup" does more than "she distrusts men" and "her father was abusive" combined.
- Behavioral not adjectival: describe what the behavior looks like, not what to call it. "She deflects personal questions with a joke and changes the subject before the silence gets uncomfortable" outperforms "she's guarded."
- Specificity over coverage: one concrete detail outperforms three vague ones. "She cooks elaborate meals she eats alone" carries more character than "she likes cooking, reading, and music."
- Front-load the engine: the first sentence of any character block carries the most attention weight. Open with the core contradiction, not the job title or hair color.
- Entropy principle: write at the level of abstraction that survives drift. "His wardrobe is carefully maintained and slightly outdated" outlasts "he owns twelve shirts" across a long conversation. High-level facts are statistically stickier than low-level facts.

---

## Structure Overview

The Rule of 7 is a Markdown document. It uses `##` headings for major sections and `**bold**` lead-ins for character slots within those sections. No nested subheadings within character blocks — prose flows as paragraphs under bold labels, keeping the document readable and token-lean.

Markdown heading hierarchy creates lexical anchors that separate semantic clusters and reduce interference between sections. Whether the LLM processes these as meaningful "chapters" or simply as reliable separators is an open question — but the practical effect of reduced bleed between sections is consistent. See the Technical Appendix for discussion of the mechanism.

### Global Sections

These surround and support the character content. They are not part of the seven character slots but are essential to the format.

**Rules** — Persistent roleplay behavioral instructions: narration perspective, action beat formatting, POV constraints, OOC handling, continuity rules. Short, imperative, unambiguous. Placed first for maximum attention weight. Note that modern instruction-tuned models have been explicitly conditioned to treat imperative language — "Never," "Always," "You are" — as learned control signals, not just semantic context. Rules placed here are both semantically establishing and behaviorally conditioning.

**World** — The physical and social reality the characters inhabit: location, time, tone, relevant history, the user's role and starting state. One to three paragraphs of prose. Also carries prior contact closure — explicit statements about what has and hasn't happened between characters and the user before the story begins. This prevents the LLM from inventing false shared history to fill gaps left by a vague premise.

**Cast** — Cohort-level characters who don't warrant full Rule of 7 treatment. One to three sentences per figure: role, signature trait, surfacing conditions. Active plot-relevant information lives here rather than in a separate field.

**Triggers** — Global conditional behaviors as a bulleted list using arrow notation: `condition → response`. The one deliberately structured section in the format. Plot-critical events — especially inciting incidents that must fire in a specific way — are made statistically dominant here by naming them explicitly and stating that alternative continuations are not intended. This is where the LLM's improv instinct gets constrained when it matters most.

**Arc** — Three beats: Early, Mid, Late. Prose descriptions of how the scene and relationships evolve across the conversation. Gives the LLM a trajectory without over-specifying events.

### The Seven Character Slots

Each full character opens with a header line in italics establishing name, archetype, role, and age. Then seven bold lead-ins, each carrying a prose paragraph:

**1. Engine** — Core drive plus central contradiction. The single most important slot. Everything the LLM generates about this character should be consistent with this engine. Opens the character block because it frames everything that follows. A character without a clear Engine drifts into generic improv. A character with a sharp Engine self-corrects. The first thing the model reads should be something that immediately constrains thousands of future generations — not name, age, or hair color.

**2. Body** — Signature appearance as hooks, not a checklist. What you'd notice first, what you'd remember. Physical details that imply character: posture that's "slightly off, like a coat worn on the wrong shoulders" tells the LLM more than height and hair color listed separately. Appearance that says nothing about personality is wasted tokens.

**3. Wound** — The one backstory beat that explains current behavior. Not biography — the load-bearing causal fact. What happened, how it distorted the character's self-perception, what behavior it produces now. The Wound is active, not archival. It should explicitly feed forward into Dynamic and Limits — a bridging sentence connecting what happened to how it shaped the character's relationship to the user closes a drift vector the LLM might otherwise paper over. The wound isn't backstory. It's the explanation for every behavior the LLM is about to generate. Causality is more valuable than chronology.

**4. Voice** — Speech register, rhythm, formality level, behavioral tells in prose. No sample quotes — those belong in the Dialog Examples section at zero Background cost. Voice tells the LLM how the character thinks and speaks. Dialog Examples show it. Keeping them separate preserves the budget separation and prevents voice calibration from consuming character budget.

**5. Dynamic** — Felt relationship to the user and key NPCs. How this character perceives the user specifically, what they want from this particular connection, what they're afraid of in it. Alongside Engine, this is the highest-value slot for generation quality — it directly constrains how the character responds to the user in every exchange. A character with a weak Dynamic plays as a type. A character with a sharp Dynamic plays as a person.

**6. Triggers** — Character-specific conditional behaviors in bulleted arrow notation, consistent with global Triggers format. Plot-critical character triggers — especially first-contact events that must fire in a specific way — are made statistically dominant here by naming them explicitly and stating that alternative continuations are not intended. The LLM's improv instinct is powerful and character-consistent. Left underspecified, it will generate plausible alternatives to plot-critical events. Name the event. Make alternatives unattractive. Close the space.

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

**Dialog Examples are few-shot demonstrations, not descriptions.** Showing voice is dramatically more effective than describing it. Each example should place the character under a different emotional register — guarded, deflecting, frightened, direct, aggressive, tender — with a challenge prompt that has enough edge to force personality to the surface. Never plot content. Never lifted from the greeting. These are style references, not story beats. The LLM has already seen the greeting; repeating it wastes a calibration slot.

**Multi-character bots unlock additional tiers:**

*Tier 1 — per-character, user-facing.* The four-register spread for each character independently. Baseline and highest-value use of the budget — guarantees each character holds distinct voice even when the LLM is juggling multiple.

*Tier 2 — inter-character dialog.* Examples of characters talking to each other, not the user. Calibrates relationship texture — how two characters speak around each other, past each other, at each other — in a way no amount of Background prose about the relationship can replicate, because dialog shows rhythm and Background can only describe it.

*Tier 3 — multi-party scenes.* A scene with the user and two characters present simultaneously, showing how each character's register shifts when the other is also in the room. This is the hardest thing for LLMs to hold under low memory. Multi-party coherence is the first thing to drift. Even one or two examples here is disproportionately valuable.

**Speaker labels must match the character's canonical name exactly** as it appears in the Background character header. Mismatched labels cause voice bleed between characters.

A full four-register set per character plus inter-character exchanges for a two-character bot runs approximately 1,500 characters — barely 15% of the available budget. The Dialog Examples budget is routinely underused. It shouldn't be.

---

## Critical Authoring Rules

**The Intro field is a live LLM input.** Testing on PolyBuzz confirms the Intro is read by the LLM, not just displayed to browsing users. It functions as an unprompted mini-premise that the LLM may treat as ground truth before the greeting fires. Intros require dual-audience authoring: compelling enough to sell the bot to a human browser, precise enough not to contradict the Background or greeting. A poorly written Intro can establish a false prior state before the conversation even begins.

**The greeting establishes current state.** The LLM treats the greeting as the authoritative present moment. If the Background establishes prior history but the greeting performs a first meeting, the LLM resolves the conflict in favor of the greeting and invents history to fill the gap. The greeting and Background must agree on what has and hasn't happened.

**Prior contact closure is mandatory.** Any Background that establishes a relationship history must include explicit language closing the invention space: what interactions have occurred, what hasn't been said, what arrangements do not exist. "No prior arrangements exist between them" is load-bearing prose, not filler. The LLM will invent plausible shared history if the space is left open — not because it fails, but because it succeeds at filling an underspecified context. Close the space.

**Plot-critical triggers must be made statistically dominant.** The LLM's improv instinct is powerful and character-consistent. Left underspecified, it will generate plausible alternatives to plot-critical events — a psychic sees a cat in a restaurant kitchen instead of a sister dying at a dinner table. Not a failure: a success at improv inside an underspecified space. Name the event explicitly. State that alternatives are not intended. Make the target continuation so well-specified that alternatives become statistically unattractive.

**Personality is distributed, not slotted.** There is no Personality block in the Rule of 7. Traits, motivations, fears, and values are distributed across Engine (motivation), Wound (fear and origin), Dynamic (relational expression), and Limits (behavioral ceiling). A standalone Personality block reintroduces the redundancy problem: the same trait stated as a label and demonstrated in Voice is two tokens spent on one fact. If a personality detail doesn't fit naturally into one of the seven slots, it probably isn't load-bearing enough to include.

**Rule of 7 is a characterization format, not a state management system.** The format handles static character facts — who someone is, what drives them, how they speak — with high efficiency. It does not address mutable world state: current injuries, known secrets, recent promises, inventory, relationship changes across sessions. Those are simulation facts, not characterization facts, and they drift differently. For long-running scenarios where mutable state matters, a lightweight state block appended to the World section is a reasonable extension — but state management is a complementary problem that deserves its own treatment outside this specification.

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

A two-character ensemble with full world-building and global sections runs approximately 6,000 — 7,500 characters. A four-character ensemble with compressed secondaries is achievable inside 10,000 characters with discipline.

---

## Known Boundaries and Open Questions

The Rule of 7 was developed through empirical testing on PolyBuzz. The following are known boundary conditions — areas where the format's behavior is understood but the underlying mechanism is not fully resolved, or where platform-specific observations may not generalize.

**Intro field behavior** is confirmed on PolyBuzz through testing but not documented by the platform. Other platforms may handle the Intro differently or not expose it to the LLM at all.

**Dialog Examples budget isolation** is a PolyBuzz-specific architectural feature. On platforms without a separate Dialog Examples field, voice calibration examples must come from the Background budget or be omitted, which changes the density math significantly.

**State management** is the most significant open problem for long-form roleplay that Rule of 7 does not address. As conversations extend, mutable facts — what the user has said, what promises have been made, what has changed — drift faster than static characterization. A complementary state management format is the logical next development.

**Model variance** is real. The format was developed and tested against models available on PolyBuzz. Different inference endpoints, quantization levels, and context window sizes will affect how well the format's heuristics hold. The principles are grounded in how transformers process text generally, but specific behaviors may vary by model.

---

## Companion Documents

Rule of 7 is the first document in a larger methodology. The specification addresses static characterization. The following companion documents are identified as the logical next developments:

**Rule of 7: State** — managing mutable world state: injuries, inventory, known secrets, evolving relationships, and session continuity. The complement to characterization for long-running scenarios.

**Rule of 7: Examples** — annotated real bots showing why each sentence is present and what predictive work it performs. The validation of the methodology through demonstrated practice.

**Rule of 7: Failure Modes** — a catalog of known failure patterns (voice bleed, relationship drift, invented history, personality collapse, plot derailment) and how the format addresses each one.

**Rule of 7: Validation** — side-by-side comparisons of identical scenarios written in traditional schema versus Rule of 7, with conversation transcripts demonstrating performance differences. The empirical case for the format.

---

## Technical Appendix
*For readers with machine learning backgrounds. The claims in this section are offered as hypotheses grounded in observed behavior rather than controlled experimental results. Correction and refinement are welcome.*

**On the core mechanism.** The Rule of 7 is grounded in one observation: LLMs generate text by predicting the next token from context. Everything in the format follows from that. A well-written Engine slot reduces uncertainty about future token predictions by establishing a strong prior for the character's behavior. A Wound establishes causality that constrains how the character interprets events. Dialog Examples are few-shot demonstrations that shift the probability distribution toward the target voice register. The format primarily shapes the probability distribution the LLM predicts within, rather than relying solely on explicit procedural instructions — though both mechanisms operate simultaneously. Modern instruction-tuned models have been explicitly conditioned through supervised fine-tuning and reinforcement learning to treat imperative language as learned control signals. "You are," "Never," and "Always" are not just semantic context — they trigger conditioned compliance behaviors. Rule of 7 therefore operates on two levels: semantic characterization that narrows the prediction space, and explicit behavioral instructions that leverage instruction-tuning conditioning. Acknowledging both gives a more complete account of why the format works.

**On the information theory framing.** The central optimization criterion — reduce uncertainty about future generations — maps directly onto information-theoretic principles. Compress multiple constraints per unit of context. Avoid redundant encoding. Write at the level of abstraction that survives drift. These are the same principles that govern efficient encoding in other domains. Rule of 7 may be a specific instance of a more general information encoding strategy for probabilistic language models rather than a prompt engineering convention specific to roleplay. This claim is offered as a hypothesis worth investigating, not an established result.

**On positional priority.** Early versions of this specification claimed that earlier content receives higher attention weight, which is true but overstated for modern models. GPT-3 era models showed strong primacy effects. Modern long-context models with RoPE scaling, attention sinks, and improved positional encoding have reduced but not eliminated this effect. The practical guidance — place Rules and Engine early — remains valid as a heuristic: early placement reduces competition with later narrative detail and establishes priors before the LLM has accumulated conflicting context. It is not a guarantee of attention weighting and should not be treated as one.

**On Markdown as semantic chunking.** The claim that `##` headings function as chapter markers for LLMs is probably correct in effect but uncertain in mechanism. The LLM was trained on vast quantities of Markdown-formatted text — technical documentation, wikis, README files — where heading hierarchy consistently correlates with semantic boundaries. Whether the model has learned to treat headings as meaningful separators, or whether the effect is simply that headings create lexical anchors that reduce interference between adjacent sections, is not fully resolved. The practical effect — reduced bleed between character blocks — is consistent in testing. The mechanism behind it is an open question.

**On plot locking.** The specification uses language like "statistically dominant" and "alternatives unattractive" to describe Trigger entries for plot-critical events. The actual mechanism is probabilistic, not deterministic. Explicit, detailed specification of an event makes alternative continuations statistically unattractive by concentrating probability mass around the intended continuation. The LLM is not executing a runtime constraint — it is predicting tokens from a context that strongly favors one outcome. The practical result is reliable. The language of "locking" used in earlier versions of this document was an authoring metaphor, not a technical description, and has been replaced throughout.

**On prose versus structure.** The claim that prose outperforms rigid schema is supported by the observation that modern transformers build contextual embeddings over text rather than executing parsers over labels. Coherent prose allows the model to infer relationships through the same mechanisms it uses to process training data. However, this is not universal. Certain structured information — lookup data, enumerated conditionals, fixed values — is robust in labeled form and benefits from explicit structure. The principle is not prose everywhere but prose for semantic content, structure for mechanical content. The boundary between those categories requires authoring judgment.

**On evocative language and drift resistance.** The observation that distinctive language outlasts accurate language in long conversations is consistent with how attention mechanisms weight semantically salient tokens. A phrase like "smells like sandalwood and quiet failure" is more semantically distinctive than "small declining shop" — it occupies a more unique region of the embedding space, which may make it more retrievable under the kind of context pressure that produces drift. This is a hypothesis consistent with transformer behavior rather than a verified experimental result.

**On few-shot calibration via Dialog Examples.** The use of Dialog Examples as voice calibration is grounded in established few-shot learning behavior. Demonstration examples shift the model's output distribution toward the demonstrated register more reliably than prose descriptions of the same register. "She deflects with humor" is a description. An example of her deflecting with humor is a demonstration. Demonstrations are more predictively constraining than descriptions for the same token cost, which is why Dialog Examples belonging in a separate field rather than embedded in prose is architecturally significant when a separate budget exists.

**On the information hierarchy.** A reviewer proposed a priority ranking for the seven slots based on predictive importance rather than literary convention: Rules, Engine, Dynamic, Triggers, Wound, Voice, Limits, Body. This ranking reflects the observation that Engine and Dynamic most directly constrain per-exchange generation — Engine establishes the character's prior, Dynamic constrains how that prior expresses in response to the user. The specification places Engine first in the character block for this reason, but does not enforce a strict ordering of remaining slots. Authoring clarity is weighted against strict predictive hierarchy for practical usability.

---

*The Rule of 7 was developed through iterative testing on PolyBuzz with a catalog of 80+ bots. The format emerged from the observation that the most persistent failure modes in LLM-driven roleplay — drift, history invention, voice bleed, plot hijacking — are authoring problems, not model problems. A well-specified bot on a weak model outperforms a poorly specified bot on a strong one. The format is a characterization discipline, not a prompt engineering trick.*