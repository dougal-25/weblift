# Wiki

The brain of this project. LLM-maintained, human-curated. Code answers *what* and *how*; this wiki answers *why* and *for whom*.

## Structure

```
wiki/
├── index.md          # Catalogue of every page (always-current)
├── log.md            # Append-only chronological log of changes
├── spec/             # What we're building, who for, what it is NOT
│   └── overview.md
├── features/         # One page per feature: status, acceptance criteria, open questions
├── decisions/        # ADRs: every non-trivial choice + reasoning
├── personas/         # Target users — what they actually need
├── research/         # Competitor teardowns, references, user interviews
└── raw/              # Immutable source material (articles, screenshots, transcripts)
```

## Workflow (for the LLM)

**Ingest** — Doug drops something into `raw/`. Read it, summarise in `research/`, update relevant `spec/`, `features/`, `personas/` pages. Append `log.md` entry. Update `index.md`.

**Build** — Before writing code, read `spec/overview.md` + relevant `features/*.md` + recent `decisions/`. If the wiki is silent on what's being built, STOP and write the spec page first.

**After code** — Update relevant feature page (status, what changed, what's left). Add a `decisions/` entry if a non-trivial choice was made. Append `log.md`.

**Lint** (periodic) — Find contradictions, stale claims, orphan pages, missing cross-references. Suggest gaps to fill.

## Log entry format

`## [YYYY-MM-DD] <ingest|build|decision|lint> | <one-line summary>`

Then 1-3 bullet lines on what happened.

## Link style

Wiki links use **standard markdown** — `[Overview](spec/overview.md)` — never `[[wikilinks]]`. Reason: filenames repeat across projects (every project has its own `overview.md`, `log.md`, `index.md`). Wikilinks resolve by filename and silently misroute to the wrong project's file in Obsidian's graph. Markdown links are path-relative and never collide. They also work in GitHub, VS Code, and the terminal — Obsidian-only syntax is a trap.
