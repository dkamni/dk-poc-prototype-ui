---
applyTo: "**"
---

# ai-layout — Copilot Instructions

## Project context

- This is the **Greycon Essentials POC** front end: a client-rendered React + TypeScript SPA built with Vite, hosted on Azure Static Web Apps.
- Domain and requirements authority lives outside this repo, in `ai-dlc-artifacts`:
  - `domain-knowledge/domain-model-CORE.md` — business entities, rules, invariants.
  - `domain-knowledge/domain-model-UI.md` — UI-specific rules, epics, and data shapes.
  - Product Requirements PDF ("Greycon Essentials POC") — scope, units of work, acceptance criteria.
- Do not redefine a CORE term or weaken a CORE/UI invariant. If a request conflicts with a documented rule, flag it instead of silently complying.
- The Gantt chart (UoW-6, "Manual Gantt") is IN SCOPE for this build even though the PRD lists it as a stretch-goal — this was a deliberate team decision. Its reference design is the "Schedule" tab in the Claude mockup (`POC UI - Mockup`).

## Working agreement (hard constraints)

These apply to every turn unless the user explicitly relaxes them for that turn:

1. **≤ 100 lines of code per turn.** Stop and let the user review/accept before continuing, even if the task isn't finished.
2. **≤ 2 files touched per turn** (created or edited).
3. **Never invent rules or fill gaps with assumptions.** If a requirement, design detail, or business rule is not clearly defined, stop and ask a clarifying question instead of guessing.
4. **Never delete files, folders, or run other destructive/hard-to-reverse commands without asking first** — even debris the assistant created itself by mistake (e.g. a misplaced `npm install`). Explain what will be removed and why, then wait for explicit confirmation.
5. **Run terminal commands from the correct project directory.** Before running `npm install` or similar, verify the terminal's working directory is this project's folder, not a parent or sibling folder.
6. **A question is not a request to act.** If the user asks "why", "what", or otherwise phrases something as a question, answer in words only. Do not edit files or run commands in response unless the user explicitly asks for a fix/change.

## Structure conventions

- One component per folder under `src/components/`, e.g. `src/components/login/Login.tsx`. Co-locate a component's styles/sub-parts inside its own folder rather than as flat sibling files.
- The old flat `src/layouts/*.tsx` files are being retired in favor of the `src/components/` structure.
- Visual constants (colour, spacing, radius, typography) stay in `src/tokens.ts` as the single source of truth; `src/theme.ts` maps tokens into the component library's theme.

## Commands

- `npm run dev` — start Vite dev server.
- `npm run build` — type-check (`tsc`) then build.
- `npm run preview` — preview the production build.
