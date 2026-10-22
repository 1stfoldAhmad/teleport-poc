# teleport-poc

Research into [teleportHQ/teleport-code-generators](https://github.com/teleporthq/teleport-code-generators):
license terms, the UIDL JSON source-of-truth format, and whether its visual builder can be
extracted for use in a Tauri application.

**➡️ Full findings: [TELEPORT-REPORT.md](./TELEPORT-REPORT.md)**

## TL;DR

- **Open source?** Yes — MIT licensed. **Commercial use?** Yes (keep the copyright notice).
- **Visual builder in the repo?** **No.** The repo contains only the UIDL core
  (types/validator/builders) + code generators. TeleportHQ's drag-and-drop editor is
  closed-source SaaS — there is no builder to extract.
- **JSON as source of truth?** Yes — UIDL JSON (`ComponentUIDL` / `ProjectUIDL`).
  The builder produces it; the generators consume it (`generateComponent(uidl)` /
  `generateProject(uidl)`), after validation. Full annotated structures are in the report.

Status: research/report-only (no code extracted, no builder built) — decided 2026-10-22.
Recorded preferences if this proceeds later: React + Vite + TypeScript, web-first / Tauri-ready.
Recommended next spike (on go-ahead): embed Puck (`@puckeditor/core`), JSON file as source of truth. See shortlist §6.
