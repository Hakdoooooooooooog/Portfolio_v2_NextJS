# Agent notes

## Writing standard (baseline)

All user-facing copy is edited against the **no-ai-slop** standard (skill installed at
`~/.agents/skills/no-ai-slop`, source: `petergyang/no-ai-slop`). Write like a sharp human
editor: keep the writer's real voice, cut AI patterns, stay concrete.

Apply it to: site content (`utils/constants/index.ts`, `components/**`), the README, and
`docs/**`.

**Cut:** binary contrasts ("not X, it's Y"), throat-clearing openers, faux-insight setups,
dramatic colon reveals, importance puffery, superficial `-ing` analysis, weasel
attribution, synonym cycling, rhetorical setups, summary-recap endings.

**Banned words:** delve, foster, leverage, utilize, facilitate, empower, streamline,
robust, cutting-edge, paradigm shift, game changer, tapestry, realm, beacon, multifaceted,
meticulous, intricate, paramount, transformative, elevate, embark, supercharge, harness,
ever-evolving, seamless.

**Prefer:** active voice, concrete specifics over abstraction, "is"/"has" over fake-strong
verbs, the portability test (if a line could describe any company/product, cut or make it
specific), and zero em dashes in short copy.

Before shipping copy, run it past the `no-ai-slop` skill.
