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

## Shell execution standard (Git Bash / NVM)

Node.js and npm are configured via NVM in Git Bash (`~/.nvm/versions/node/v24.21.0/bin/`).
PowerShell has no `node` or `npm` in its PATH, and the default `bash` command in System32 invokes WSL (which is unconfigured).

Run all Node, npm, npx, and Next.js commands via Git Bash login shell:

```powershell
& "D:\Git\bin\bash.exe" -l -c "<command>"
```

Examples:
- Dev server: `& "D:\Git\bin\bash.exe" -l -c "npm run dev"`
- Install: `& "D:\Git\bin\bash.exe" -l -c "npm install"`
- Build: `& "D:\Git\bin\bash.exe" -l -c "npm run build"`
- Lint: `& "D:\Git\bin\bash.exe" -l -c "npm run lint"`
- Tests: `& "D:\Git\bin\bash.exe" -l -c "npm test"`

## Path sanitization standard

Never display personal names or Windows username directories in documentation, committed files, or responses. Use `~`, `<USER>`, or `%USERPROFILE%` (e.g. `~/.nvm/...`).


