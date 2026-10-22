# Best Open-Source UIDL-Type Visual Builders (TeleportHQ-type, not Figma-type)

**Date:** 2026-10-22 · **For:** embedding a ready-made visual builder in a **Tauri (React + Vite + TypeScript)** app, where a **JSON document is the source of truth** (the TeleportHQ/UIDL model).
**Method:** Live verification on 2026-10-22 via GitHub API (stars, `pushed_at`, latest release, LICENSE file contents) + npm registry (latest version/date) + official docs. 20+ candidates screened, **17 scored in full** below (≥10 as requested).
**Companion doc:** [`TELEPORT-REPORT.md`](./TELEPORT-REPORT.md) (Teleport license + UIDL JSON structure).

### What "UIDL-type / TeleportHQ-type, not Figma-type" means here

- ✅ Document = a **serializable JSON component/block tree** (`type + props + children/slots`) — save it to a file/DB, render or codegen from it.
- ✅ Users assemble **real app components** and edit their **props/styles in panels**; layout follows DOM flow (flex/grid).
- ❌ **Excluded on purpose:** Figma-type design tools (freeform vector artboards, pen tool — e.g. Penpot), code-canvas editors (e.g. Onlook), pure drag-drop primitives (dnd-kit / React DnD — not builders), proprietary SaaS builders with open SDKs only (Builder.io, Webflow).
- ✅ "Ready-made" = ships an editor shell (canvas, drag-and-drop, outline/layers, inspector fields, storage callbacks, renderer) you can embed/run — not just an engine you must build an editor around.
- ✅ "Actively maintained" = code pushes **and** releases in roughly the last 6 months (checked against 2026-10-22).
- ✅ License judged for **your previous goal — a commercial Tauri product**: MIT/BSD/Apache = safe to embed closed-source; AGPL/GPL/custom = legal review required before shipping inside a distributed desktop app (summary, not legal advice).

---

## 🏆 Verdict

> **For a builder inside a Tauri + React app with JSON as the source of truth, use Puck Editor (`@puckeditor/core`, MIT).**
> It is the only candidate that scores green on *all five* of your criteria at once: open source (MIT), pushed the day of inspection, ready-made editor you embed as **one React component**, page = clean JSON in/out (`onPublish(data)` → your file/DB; `<Render>` plays it back), and component-based (you register *your* components — zero vendor runtime in the output).

| If your output is… | Pick instead | Why |
|--------------------|--------------|-----|
| **Static HTML/CSS websites or email-ish templates** (no React runtime at render time) | **GrapesJS** (BSD-3-Clause) | Most mature web-builder framework in existence (2016, 26k★); stores project JSON, exports standalone HTML/CSS/JS; framework-agnostic, works in a Tauri webview via plain JS. |
| **Admin panels / data-heavy CRUD screens** described purely as JSON | **Amis + amis-editor** (Apache-2.0) | Baidu's JSON→page runtime with 100+ built-in data components and a ready visual editor — closest living relative of Teleport's UIDL idea (runtime rendering instead of codegen). Caveat: docs are Chinese-first. |
| **A full internal-tools platform** (server, users, DBs, permissions — Retool-style) | **Appsmith** (Apache-2.0) | Most mature/active in the class — but it's a **whole server platform**, not a component you embed in Tauri (see §3C). |

**Hard truth up front:** only **Puck** and **GrapesJS** pass *all* filters (embeddable + JSON-truth + permissive license + actively maintained + mature) **for Tauri**. Several famous names fail in 2026: **Craft.js** (no push/release since 2025-02-14), **Alibaba LowCode Engine** (release v1.3.2 = 2024-02-23, last push 2025-03-10), **Plasmic/Webstudio/Silex** (the builder itself is AGPL/platform-shaped, not an embeddable MIT component), **ChaiBuilder** (mid-migration: old `sdk` repo archived 2026-09-12, new `core` is v0.1.0 and not yet on npm).

---

## 1. Scoreboard — all 17 builders (verified 2026-10-22)

**Score = fit for *your* project (embed in Tauri + React, JSON source of truth, commercial-safe), not generic quality.** A superb platform scores low here if it can't live inside a desktop app.

### A. Embeddable editor SDKs — the Tauri-relevant class

| # | Builder | ★ | License (verified) | Last push / latest release | Ready-made embed? | JSON truth | Fit score | Verdict |
|---|---------|---|--------------------|----------------------------|---|---|---:|---|
| 1 | **Puck Editor** ([puckeditor/puck](https://github.com/puckeditor/puck)) | 13,505 | **MIT** | 2026-10-22 / v0.23.0 (2026-08-07) | ✅ `<Puck>` React component | ✅ Pure (`content[] + root`) | **92** | **🏆 Winner for Tauri+React** |
| 2 | **GrapesJS** ([GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs)) | 26,327 | **BSD-3-Clause**¹ | 2026-10-21 / v0.23.8 (2026-10-15) | ✅ JS lib (+ `@grapesjs/react`) | ✅ Project JSON → HTML/CSS | **86** | Best for HTML output |
| 3 | **React Page** ([react-page/react-page](https://github.com/react-page/react-page)) | 9,535 | **MIT** | 2026-07-28 / v5.4.6 (2026-07-28) | ✅ `<Editor>` React | ✅ Cell-plugin JSON | **74** | Content/landing sections, not app screens |
| 4 | **Craft.js** ([prevwong/craft.js](https://github.com/prevwong/craft.js)) | 8,761 | **MIT** | ⚠️ **2025-02-14** / 0.2.12 (2025-02-14) | 🟡 Framework — you build the editor UI | ✅ Serialized node tree | **68** | Great model, **fails active-maintenance** (20 mo stale) |
| 5 | **ChaiBuilder Core** ([chaibuilder/core](https://github.com/chaibuilder/core)) | 487 | **BSD-3-Clause** | 2026-10-13 / v0.1.0 (Git only, **not on npm**) | 🟡 Editor exists, Next.js-coupled rebuild | ✅ ChaiBlock JSON | **62** | Watch-list: immature, mid-migration |
| 6 | **VvvebJs** ([givanz/VvvebJs](https://github.com/givanz/VvvebJs)) | 8,705 | **Apache-2.0** | 2026-07-01 / 2.0.9 (2026-07-01) | ✅ Ready demo editor (vanilla JS) | ❌ HTML is the truth | **58** | Quick HTML editor, not UIDL |

### B. Standalone website-builder platforms — you fork/deploy the whole app, you don't embed a component

| # | Builder | ★ | License (verified) | Last push / latest release | Ready-made embed? | JSON truth | Fit score | Verdict |
|---|---------|---|--------------------|----------------------------|---|---|---:|---|
| 7 | **Webstudio** ([webstudio-is/webstudio](https://github.com/webstudio-is/webstudio)) | 9,100 | **AGPL-3.0-or-later**² | 2026-10-21 / 0.306.0 (2026-10-14) | ❌ Full builder server (own infra) | 🟡 Instance/style tree in its DB; export = React Router app | **52** | Best open Webflow clone — not a Tauri component; AGPL |
| 8 | **Plasmic** ([plasmicapp/plasmic](https://github.com/plasmicapp/plasmic)) | 7,124 | **MIT (SDKs) + AGPL (`platform/` = Studio)**³ | 2026-10-21 / no GH releases | ❌ Self-hosting Studio = Postgres + big monorepo | 🟡 Internal model → **codegen** out | **48** | Powerful, platform-heavy; Studio is AGPL |
| 9 | **Silex** ([silexlabs/Silex](https://github.com/silexlabs/Silex)) | 3,014 | **AGPL-3.0** | 2026-10-21 / v3.9.0 (2026-07-26) | ❌ Standalone site builder (built *on* GrapesJS) | 🟡 GrapesJS project data | **44** | Use GrapesJS directly instead — permissive license |
| 10 | **Webiny Page Builder** ([webiny/webiny-js](https://github.com/webiny/webiny-js)) | 8,047 | **MIT core + per-package/enterprise files**⁴ | 2026-10-21 / v6.5.0 (2026-10-20) | ❌ Inside Webiny CMS, **AWS serverless only** | ✅ Element JSON (in Webiny) | **40** | CMS choice, not a Tauri-embeddable builder |

### C. App / internal-tool UIDL platforms — JSON app definitions, but server platforms (Docker), not desktop-embeddable

| # | Builder | ★ | License (verified) | Last push / latest release | Ready-made embed? | JSON truth | Fit score | Verdict |
|---|---------|---|--------------------|----------------------------|---|---|---:|---|
| 11 | **Amis + amis-editor** ([baidu/amis](https://github.com/baidu/amis)) | 18,891 | **Apache-2.0** (editor: ISC) | 2026-03-18 / 6.13.0 (2025-08-12) | ✅ Editor is a React component | ✅ Pure JSON schema→rendered page | **66** | Best pure-UIDL *runtime*; Chinese-first docs, huge |
| 12 | **Alibaba LowCode Engine** ([alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine)) | 15,875 | **MIT** | ⚠️ **2025-03-10** / v1.3.2 (**2024-02-23**) | 🟡 Designer *engine* + demo shell | ✅ Lowcode schema JSON | **54** | Excellent UIDL-like spec, **fails active-maintenance** |
| 13 | **Appsmith** ([appsmithorg/appsmith](https://github.com/appsmithorg/appsmith)) | 41,103 | **Apache-2.0** | 2026-10-22 / v2.5.1 (2026-10-21) | ❌ Java+Mongo+Redis server (Docker) | ✅ App JSON (widget DSL export) | **50** | **Best internal-tools platform overall** — wrong shape for Tauri |
| 14 | **ToolJet** ([ToolJet/ToolJet](https://github.com/ToolJet/ToolJet)) | 41,115 | **AGPL-3.0** | 2026-10-22 / v3.20.247-lts (2026-10-21) | ❌ Server platform | ✅ App JSON definitions | **46** | Appsmith alternative; AGPL + server-bound |
| 15 | **Budibase** ([Budibase/budibase](https://github.com/Budibase/budibase)) | 28,340 | **GPLv3 overall** (per-package)⁵ | 2026-10-21 / v3.50.0 (2026-10-19) | ❌ Server platform | ✅ App/component JSON (internal) | **45** | Fast CRUD builder; GPL + server-bound |
| 16 | **NocoBase** ([nocobase/nocobase](https://github.com/nocobase/nocobase)) | 24,660 | ⚠️ **Custom agreement + Apache file (Feb 2026)**⁶ | 2026-10-22 / v2.2.29 (2026-10-21) | ❌ Node server platform | ✅ Formily-based UI-Schema JSON | **45** | Data-model-driven powerhouse; license needs review, server-bound |
| 17 | **ILLA Builder** ([illacloud/illa-builder](https://github.com/illacloud/illa-builder)) | 12,334 | **Apache-2.0** | 2026-05-27 / ⚠️ 4.8.5 (**2024-08-05**) | ❌ Server platform | ✅ Widget-tree JSON | **38** | Releases stalled since 2024 — risky |

**License footnotes (read the LICENSE files on 2026-10-22):**
¹ GrapesJS: GitHub API says `NOASSERTION`; the `LICENSE` file is BSD-style ("redistribution… retain notice") and npm `grapesjs@0.23.8` declares **BSD-3-Clause**. The newer polished **GrapesJS Studio SDK is a separate, differently-licensed product** — the open-source core is what this report scores.
² Webstudio README: core = AGPL-3.0-or-later; one optional package (`sdk-components-animation`) is proprietary EULA.
³ Plasmic README: everything outside `platform/` = MIT; `platform/` (the Studio editor itself) = **AGPL** (`LICENSE.platform.md`). GitHub's SPDX badge only shows MIT — misleading if you don't open the repo.
⁴ Webiny root `LICENSE`: MIT by default, but `packages/*` and `enterprise/` carry their own license files — check per-package before use.
⁵ Budibase root licensing note: *"You can consider Budibase to be GPLv3 licensed overall"* (client libs differ; apps *built with* it don't inherit GPL).
⁶ NocoBase: as of 2026-02-24 the repo carries a custom "NocoBase License Agreement" (`LICENSE.txt`) alongside `LICENSE-APACHE.txt` (community core moved AGPL→Apache). Dual-document setup — **legal review before any commercial embedding**.

---

## 2. The JSON models side-by-side (this is the "UIDL" test)

**Puck** — page JSON is tiny and component-centric; *your* React components render it (Teleport-style separation of document vs. components):

```json
{
  "content": [
    { "type": "HeadingBlock", "props": { "id": "HeadingBlock-1234", "title": "Hello, world" } },
    { "type": "Card", "props": { "id": "Card-5678", "items": [/* … */] } }
  ],
  "root": { "props": { "title": "My page" } }
}
```
Config maps `type → { fields (inspector controls), defaultProps, render }`. Nested layout via **slot fields**. Save `onPublish/onChange` JSON anywhere; `<Render config data />` replays it. No Puck code needed at all if you later write your own renderer/codegen for the JSON — zero lock-in.

**GrapesJS** — project JSON wraps an **HTML component tree + style rules + assets + pages**:

```json
{
  "pages": [{ "id": "page-1", "component": { "tagName": "div", "components": [
      { "tagName": "h1", "content": "Hello", "attributes": { "class": "title" } } ] } }],
  "styles": [{ "selectors": [".title"], "style": { "color": "red" } }],
  "assets": []
}
```
`editor.getProjectData()/loadProjectData()` round-trips it; `getHtml()/getCss()` exports. UIDL-like, but the vocabulary is **HTML tags**, not your app components — best when HTML *is* the deliverable.

**Craft.js** — serialized node map (excellent, Teleport-adjacent model):

```json
{ "ROOT": { "type": { "resolvedName": "Container" }, "props": {}, "nodes": ["a1","b2"], "linkedNodes": {} },
  "a1":   { "type": { "resolvedName": "Text" }, "props": { "text": "Hi" }, "parent": "ROOT" } }
```
`query.serialize()/deserialize()`. You supply every pixel of editor UI around it (toolbox, settings, layers via `@craftjs/layers`).

**Amis** — the purest "JSON is the app" model (runtime interpretation, like a UIDL *renderer*):

```json
{ "type": "page", "title": "Users", "body": [
  { "type": "crud", "api": "get:/api/users", "columns": [{ "name": "name", "label": "Name" }] } ] }
```
100+ schema component types (forms, CRUD tables, charts…). `amis-editor` edits exactly this JSON visually. Trade-off: your UI is forever rendered by the (large) Amis runtime — you don't own the components.

**Teleport UIDL (reference, from `TELEPORT-REPORT.md`)**: `{ name, propDefinitions, stateDefinitions, node: { type:"element", content:{ elementType, style, attrs, events, children:[…] } } }` — Puck and Craft map onto this most naturally (§5).

---

## 3. Detailed cards

### A — Embeddable SDKs

**1. Puck Editor — 92/100 🏆** · MIT · `@puckeditor/core@0.23.0` (npm 2026-08-07; note rename from `@measured/puck`, last 0.20.2 2025-09-05) · React 18/19, TypeScript.
Ready-made `<Puck>` editor: drag-drop canvas (iframe-capable), left component list, right inspector generated from your `fields`, outline, history, plugins, permissions, slots for nesting, `resolveData` for dynamic/async props. **Strengths:** purest component-JSON model; works fully offline inside Tauri's webview; no backend; you own components *and* data; very active (pushed 2026-10-22, 88+ contributors). **Weaknesses:** 0.x semver (pre-1.0 API can shift — pin versions); ships **no built-in component library** (you register yours — a feature for product work, a cost for day-1 demos); no native concepts for Teleport-style state/events/conditionals/repeats — those become custom components/fields (§5); React-only. **Commercial:** MIT — embed in closed Tauri app freely (keep notice).

**2. GrapesJS — 86/100** · BSD-3-Clause · `grapesjs@0.23.8` (2026-10-15) · vanilla TS core, `@grapesjs/react@2.0.0` wrapper (2025-02-20).
The most mature option alive (since 2016): canvas, Block/Layer/Style/Asset/Trait managers, device previews, code viewer, storage plugins (local/remote/IndexedDB), huge plugin ecosystem (webpage/newsletter presets, MJML for email). **Strengths:** battle-tested everywhere; real multi-page projects; exports clean standalone HTML/CSS — ideal if Tauri is a *website/email template builder*. **Weaknesses:** it's a **framework, not a finished end-user product** — you assemble presets/panels (official preset packages are older; the polished ready UI is the separate Studio SDK with its own licensing); HTML-tag vocabulary, not React components; ~295 kB gzip core; React integration is a wrapper around an iframe-canvas imperative API. **Commercial:** BSD-3 core = safe to embed/sell (keep notice); don't assume Studio SDK terms.

**3. React Page — 74/100** · MIT · `@react-page/editor@5.4.6` (2026-07-28) · React, MUI-based UI.
Ready WYSIWYG **content** editor: rows/cells grid, cell plugins (Slate rich text, image, video, custom), JSON `value` in/out, read-only renderer. **Strengths:** genuinely ready-made, MIT, maintained since 2015, great for CMS articles/landing sections/help content inside Tauri. **Weaknesses:** document/row mental model — poor fit for arbitrary app screens, free layout, or data-bound components; MUI look needs theming to blend in. **Commercial:** MIT, safe.

**4. Craft.js — 68/100 ⚠️ maintenance fail** · MIT · `@craftjs/core@0.2.12` (**2025-02-14**) · React.
Best *framework* for building a fully custom React page editor: node-tree state, connect/drag hooks, rules per component, serialize to JSON (above), layers package. **Why not #1:** you must build the entire editor chrome yourself (toolbox, inspector, layers panel, history UI) — it is **not ready-made** — and as of 2026-10-22 the repo shows **no push or release in 20 months** with 227 open issues. Choose only if you need total editor-UX control *and* accept vendoring/forking it. **Commercial:** MIT, safe — the risk is abandonment, not licensing.

**5. ChaiBuilder Core — 62/100 (watch-list)** · BSD-3-Clause · `chaibuilder/core` v0.1.0, pushed 2026-10-13; old `@chaibuilder/sdk@4.0.0-beta.51` (2026-03-16), its repo archived 2026-09-12 pointing to `core`.
Tailwind-first React website builder: ready editor UI, 30+ web blocks, `registerChaiBlock` for custom blocks, flat block-JSON (`_type/_parent/props/styles`), HTML import, AI hooks. **Strengths:** closest to a finished Teleport-style *website* builder in React+Tailwind; permissive license. **Weaknesses:** 487★, v0.1.0 not yet published to npm under its new name (registry 404 for `chaicore`/`@chaibuilder/core` on 2026-10-22), repo churn (sdk→core migration), Next.js assumptions to unwind for Tauri/Vite. Re-evaluate in 6 months. **Commercial:** BSD-3, safe.

**6. VvvebJs — 58/100** · Apache-2.0 · v2.0.9 (2026-07-01) · dependency-free vanilla JS.
Ready drag-drop editor that edits **live HTML pages** (Bootstrap-friendly): component/section library, style inspector, file manager in demo, save via PHP/Node endpoints. **Strengths:** zero deps, trivially drops into a Tauri webview, WYSIWYG on real HTML. **Weaknesses:** **HTML is the source of truth** (no UIDL JSON tree to render/codegen elsewhere), component definitions are imperative JS, ageing architecture/UX. Fine for a quick static-page editor; wrong foundation for a JSON-driven product. **Commercial:** Apache-2.0, safe.

### B — Standalone builder platforms (fork-and-deploy, not embed)

**7. Webstudio — 52/100** · AGPL-3.0-or-later · 0.306.0 (2026-10-14). The credible open Webflow: pro visual CSS canvas, design tokens, CMS/data variables, export/sync to a React Router codebase via CLI. But the builder is a **server application** (DB, auth, sync) you self-host — not an npm editor component; extracting it into Tauri = forking a platform. AGPL + one proprietary optional package complicate a closed desktop product. Pick it if you want to *run a Webflow-like service*, not embed an editor.

**8. Plasmic — 48/100** · MIT SDKs / **AGPL Studio** · pushed 2026-10-21, no GitHub releases. Register your real React components, compose pages in Studio, consume via codegen or headless loader — conceptually very Teleport-like and very capable (variants, data, A/B). But Studio (the part you'd embed) is AGPL platform code (Postgres, huge monorepo, operationally heavy self-host), and the normal path depends on Plasmic's app-hosting model rather than a portable JSON file you own. MIT loader packages are safe; embedding Studio in Tauri is not a realistic/licensed path.

**9. Silex — 44/100** · AGPL-3.0 · v3.9.0 (2026-07-26). Friendly no-code static-site builder **built on GrapesJS** with hosting/publishing features, maintained since 2013. As an embed candidate it's strictly dominated by GrapesJS itself (same engine, BSD-3, no AGPL, no platform furniture). Relevant only if you want a ready end-user site builder service as-is.

**10. Webiny Page Builder — 40/100** · MIT core with per-package/enterprise license files · v6.5.0 (2026-10-20). Polished editor with element-JSON documents, but inseparable from the Webiny CMS on **AWS serverless** (Lambda/DynamoDB/S3). A CMS decision, not a Tauri component. Included because teams often shortlist it; reject for desktop embedding.

### C — App/internal-tool UIDL platforms (JSON apps on a server)

**11. Amis (+ amis-editor) — 66/100** · Apache-2.0 / editor ISC · 6.13.0 (2025-08-12), repo pushed 2026-03-18. Baidu's JSON-driven frontend: pages are JSON schemas rendered by a rich runtime (CRUD, forms, wizards, charts — data components Teleport UIDL also grew). `amis-editor` is a genuinely ready React visual editor over that JSON, embeddable in principle. **Blockers for you:** Chinese-first docs/community, very large bundle/opinionated runtime (your UI runs *inside Amis* rather than as your components), slower 2025-26 release cadence, 1,714 open issues. Best-in-class if your Tauri app is an **offline admin/CRUD tool** and your team reads Chinese or accepts translation overhead; validate bundle size in a webview early.

**12. Alibaba LowCode Engine — 54/100 ⚠️ maintenance fail** · MIT · npm 1.3.4 (2025-03-11), GH release v1.3.2 (2024-02-23). Enterprise designer *engine*: material/setter/plugin protocol, React/Vue renderers, and a formal lowcode schema (`{ componentName, props, children, condition, loop }`) that is arguably the best UIDL-equivalent spec ever open-sourced. **But:** it's an engine + demo shell (material libraries, setters, and the finished editor product are *your* job), docs are Chinese-first, and activity has stalled (last push 2025-03-10). Study its schema; don't found a 2026 product on the engine without budgeting a fork.

**13. Appsmith — 50/100 (Tauri-fit; ~95 as a platform)** · Apache-2.0 · v2.5.1 (2026-10-21). The open Retool: 45+ widgets, JS everywhere, every datasource, Git-synced app JSON (exportable widget DSL), huge community (41k★). **Why low here:** deployment is a multi-container **server** (Java backend, Mongo, Redis); the editor cannot be embedded as a library or run offline in Tauri. If your "project" can be a self-hosted web platform instead of a desktop app, this is the safest mature choice in the whole document. Apache-2.0 = commercial-friendly.

**14. ToolJet — 46/100** · AGPL-3.0 · v3.20.247-lts (2026-10-21). Appsmith-class platform (41k★, very active) with app-JSON definitions and a polished builder. Loses to Appsmith for commercial embedding on AGPL (their commercial licensing exists — talk to them) and shares the server-platform shape. Not Tauri-embeddable.

**15. Budibase — 45/100** · GPLv3 overall · v3.50.0 (2026-10-19). Fastest path to pretty CRUD apps (28k★, automations, built-in DB). Apps you *build with* it aren't GPL, but the builder is a GPL server platform — you can't lift its editor into a closed Tauri binary. Great if self-hosting the whole thing is acceptable.

**16. NocoBase — 45/100** · custom agreement + Apache core file (2026-02) · v2.2.29 (2026-10-21). Data-model-driven no/low-code platform whose UI is Formily **UI-Schema JSON** edited WYSIWYG (genuinely UIDL-spirited), plugin architecture, 24k★, extremely active. Server platform (Node/Koa + DB); licensing now spans two documents (community core Apache per `LICENSE-APACHE.txt`, under a custom overall agreement) — get written clarity before commercial reuse. Not a Tauri library.

**17. ILLA Builder — 38/100** · Apache-2.0 · pushed 2026-05-27 but **last release 2024-08-05**. Retool-alternative with a widget-tree JSON and nice canvas; the two-year release gap fails the actively-maintained bar regardless of occasional pushes. Avoid for new foundations.

### Screened out (why famous names are missing from the table)

| Candidate | Reason |
|-----------|--------|
| **Builder.io / Webflow** | Builder *itself* is proprietary SaaS (only SDKs are MIT) — fails open-source ready-made. |
| **Penpot / Onlook** | Figma-type / code-canvas — excluded by your definition. |
| **JSON Forms** (MIT, active) | Renderer for JSON+UI Schema — **no ready-made visual builder**. |
| **Formily / Designable** | Form-centric; Designable last pushed 2025-04-07 — stale, and form-schema ≠ page UIDL. |
| **Easyblocks** | AGPL, last pushed 2024-08-15 — stale. |
| **Atri Labs** | GPL-3.0, last pushed 2023-08-11 — dead. |
| **OpenBlocks → Lowcoder** | OpenBlocks dead since 2023; Lowcoder (AGPL, 1.6k★) is a smaller Appsmith-class platform — same server-shape objection. |
| **Email Builder JS** (MIT, 1.7k★) | Good JSON block builder, but **email-only** document model; note it if you ever need email templates in Tauri. |
| **Lowdefy** | Active (Apache) but **config-as-code (YAML)**, no ready drag-drop builder. |
| **TeleportHQ generators** | No builder at all (see `TELEPORT-REPORT.md`) — the reason for this search. |
| **hi-donwi/UIDL-Builder** (checked 2026-10-22, see §7) | Genuinely UIDL-type and functionally impressive, but **5 weeks old, 0★, solo author, no releases — and no `LICENSE` file** despite an MIT badge in the README. |

---

## 4. Recommendation for your project

### Primary: **Puck Editor** in React + Vite, hosted by Tauri

```
Tauri shell (Rust)
 └─ Webview: React + Vite + TS app
     ├─ <Puck config data onPublish>        ← ready-made editor (MIT)
     ├─ Your component registry             ← Config: fields + render per component
     ├─ document.json  ★ SOURCE OF TRUTH    ← Puck Data JSON (content[] + root)
     │     saved/loaded via Tauri fs/dialog APIs (works offline, user owns files)
     └─ <Render config data>                ← preview / final view, same components
 Optional later: JSON → exporter (HTML/React/your format) — you own the format.
```

**Why it wins for you:** (1) only all-green candidate; (2) document JSON is framework-clean and tiny compared to Teleport `ProjectUIDL` — you keep the "JSON is the source of truth" architecture without inheriting Teleport's 42 MB schema surface; (3) MIT + offline webview = no license server, no SaaS, no AGPL contamination of your desktop binary; (4) rendering uses *your* React components, so the builder and the shipped UI can never drift apart.

**Risks to manage:** pin `@puckeditor/core` until 1.0 and wrap it behind your own thin `Builder` component/config module (so an upstream breaking change is a one-file event); budget the work to create your component registry (this *is* your product's design system); multi-page/routing state lives *outside* Puck (a `pages[]` wrapper around per-page Data JSON — mirror Teleport's `route` idea minimally).

### Choose GrapesJS instead if…

…the Tauri app's *output* is HTML/CSS (website builder, landing/email template studio, "export .zip of a site"). Then GrapesJS's HTML vocabulary is a feature, its Style/Asset managers save months, and its project JSON still satisfies "JSON is the truth" (with HTML/CSS as the export). Keep the open-source **core** (BSD-3); evaluate Studio SDK separately if you want its polished UI.

### Choose Amis instead if…

…the app is dominated by **forms/tables/CRUD/admin screens**, you want 100+ data components for free, and runtime-interpreted JSON (no build step, screens hot-swappable as JSON files) beats owning React components. Prototype the editor's bundle size and English-doc friction before committing.

---

## 5. Bonus: mapping Puck ⇄ Teleport UIDL (if you still want Teleport JSON compatibility)

| Teleport UIDL concept | Puck equivalent | Notes |
|-----------------------|-----------------|-------|
| `ComponentUIDL.name` | Puck component key (`type`) | Registry of Config components |
| `propDefinitions` (+ defaults) | `fields` + `defaultProps` | Field types: text, number, select, radio, array, object, slot, custom… |
| `node` tree (`element` + `children`) | `Data.content[]` + **slot fields** for nested children | Puck stores slots inline in props |
| `elementType` primitives (container/text/button/…) | Your primitive components in Config | You define the vocabulary — keep it small |
| `attrs` static values | plain props | Direct |
| `attrs`/`children` **dynamic** (`$props/$state`) | No native binding language — use `resolveData`, custom fields, or wrapper components | Biggest semantic gap; design a small binding convention if you need it |
| `events` (stateChange…) | No native equivalent — encode as props on action-capable components | Or keep interactions inside your components |
| `repeat` / `conditional` nodes | Array fields / custom "Repeater", "Conditional" components with slots | Doable as first-class registry entries |
| `ProjectUIDL.root.route` pages | Your own `{ pages: [{ id, path, data: PuckData }] }` wrapper file | Simpler than Teleport's Router-conditional encoding |
| Generators (React/Vue/HTML out) | `<Render>` now; your own exporter later | You said "no generators" — runtime rendering matches that |

A lossless bidirectional converter is **not** realistic (dynamic bindings/events differ); a one-way **Teleport UIDL → Puck Data importer** for static structure+styles+props is straightforward. Recommendation: adopt Puck JSON as *your* source of truth; treat Teleport UIDL as an import format at most.

---

## 6. Suggested next step (2–3 day spike, only on your go-ahead)

1. Scaffold Vite + React + TS (web-first, Tauri-ready as previously recorded) with `@puckeditor/core`.
2. Register ~8 primitives (Container/Flex, Heading, Text, Image, Button, Card, Input, Repeater) with fields/defaults mirroring the Teleport examples in `TELEPORT-REPORT.md`.
3. Save/Load document JSON (download/upload in web; Tauri `fs`+dialog later), plus `<Render>` preview route and JSON viewer panel.
4. Import-check: hand-convert `component-sample.json` (Teleport) to Puck Data to prove the model mapping in §5.
5. Decide: Puck JSON as native format (recommended) vs. maintaining a Teleport-UIDL import/export layer.

---

## 7. Addendum (2026-10-22): `hi-donwi/UIDL-Builder` — checked on request

**Repo:** https://github.com/hi-donwi/UIDL-Builder · **Live demo:** https://hi-donwi.github.io/UIDL-Builder/ · **Verdict: interesting reference/starter, NOT a production foundation today — Fit score 42/100** (concept fit is high; license + maturity kill it). It does not displace Puck (92) or GrapesJS (86).

### What it is

A standalone **React 19 + Vite + TypeScript + Tailwind 4 + Zustand** studio app (~8,700 LOC) built on the author's own **`uidl-runtime`** npm package. It is genuinely TeleportHQ-type, not Figma-type: drag-and-drop canvas with desktop/tablet/mobile viewports, layer tree, property inspector auto-generated from widget prop descriptors, visual action/event binding (`setState`, `navigate`, `api`, `showDialog`…), state & data-sources editor, theme-token studio, template gallery, two-way JSON editing, import/export, offline `localStorage` drafts, cross-tab `BroadcastChannel` sync, and React/Flutter/Compose snippet export. **Verified working:** cloned it — `pnpm install` ✅, `tsc --noEmit` ✅, **64/64 Vitest tests pass** ✅, production build ✅ (754 kB JS / 203 kB gzip), GitHub Pages deploy green, live demo loads.

### Its JSON is its OWN UIDL dialect — not Teleport's

```json
{ "$schema": "https://uidl.dev/schema/v1/document.json", "version": "1.0.0",
  "id": "customer-onboarding-form", "name": "Customer Onboarding",
  "root": { "id": "form_root", "type": "Container",
            "props": { "className": "max-w-2xl mx-auto p-8 …" },
            "children": [ { "id": "input_name", "type": "TextField",
                            "props": { "label": "Company Name" } } ] } }
```

Document = `{ $schema, version, id, name, route?, theme?, state?, dataSources?, definitions?, root }`; node = `{ id, type, props, children?, slots? }` with a fixed widget registry (Container, Row, Text, Button, TextField, Select, DataTable, charts…) and **Tailwind `className` strings** for styling. Structurally this is closer to Puck's model than to Teleport's `ComponentUIDL` (`node.content.elementType/style{}/attrs/events`) — **it cannot open Teleport `component.json`/`project.json`, and Teleport generators cannot consume its output.** "UIDL" here is the generic term reused for a new, single-author schema (v1.0.0, Sept 2026). Its code export is also *runtime embedding* (generated TSX/Dart/Kotlin just embeds the JSON + calls that platform's UIDL renderer), not Teleport-style per-node code generation — so your output stays coupled to `uidl-runtime` and its sibling runtimes.

### Scorecard against your five criteria

| Criterion | Result | Evidence (2026-10-22) |
|-----------|--------|----------------------|
| UIDL-type (Teleport-like, not Figma) | ✅ **Pass** | JSON document is the source of truth; builder + runtime renderer around it |
| Open source | ❌ **Fail (as-is)** | README shows an MIT badge + "MIT © Doni Wicaksono", **but there is no `LICENSE` file**, no `license` field in `package.json`, and the GitHub API reports `license: null`. Default copyright = all rights reserved; the badge alone is not a usable commercial grant. (The `uidl-runtime` dependency itself *is* properly MIT.) |
| Actively maintained | 🟡 **Unproven** | 15 commits, last push 2026-10-18 — but that's a 5-week history from **1 contributor**, no releases/tags |
| Ready-made | 🟡 **As an app, yes; as an embeddable, no** | Working studio + live demo, but `package.json` has no `main`/`exports` — it's a Vite **application**, not an npm editor component. Tauri use = fork the whole app and rewire `localStorage` → Tauri FS |
| Mature | ❌ **Fail** | Created **2026-09-17**, v0.1.0, **0 stars / 0 forks / 0 users**, runtime `uidl-runtime@0.1.6` first published 2026-09-13; builder even pins an older runtime (0.1.6) than npm latest (0.1.8) |

### How to use it safely

1. **Do not** copy its code into a commercial product until the author adds a real `LICENSE` file (one PR/issue could fix this — the README suggests MIT was intended).
2. **Do** use it as a *feature checklist / UX reference* for a Puck-based builder: document-health auditor, schema migration, action simulator, template gallery, and state/data-source panels are ideas Puck leaves to you.
3. If the license is fixed and it survives 6+ months with tagged releases, re-score it — as a *forkable starter app* (same React+Vite+TS stack you'd use in Tauri) it could reach ~55/100, still below Puck as an embeddable SDK.

---

## Appendix — sources (all checked 2026-10-22)

- GitHub API snapshots for every repo above (stars / `pushed_at` / latest release / LICENSE contents) — repo links inline in tables.
- npm registry: `@puckeditor/core@0.23.0` (MIT, 2026-08-07) · `grapesjs@0.23.8` (BSD-3-Clause, 2026-10-15) · `@craftjs/core@0.2.12` (MIT, 2025-02-14) · `@react-page/editor@5.4.6` (MIT, 2026-07-28) · `amis`/`amis-editor@6.13.0` (2025-08-12) · `@alilc/lowcode-engine@1.3.4` (2025-03-11) · `@chaibuilder/sdk@4.0.0-beta.51` (BSD-3-Clause, 2026-03-16); `chaicore` not found on npm.
- Puck docs: https://puckeditor.com/docs (Config, Data model, `<Puck>`, `<Render>`) · GrapesJS: https://grapesjs.com · Craft.js: https://craft.js.org · Amis: https://baidu.github.io/amis · Plasmic licensing split: repo `LICENSE.md` + `LICENSE.platform.md` · Webstudio licensing: repo README · NocoBase: repo `LICENSE.txt` + `LICENSE-APACHE.txt` (2026-02-24).
- Teleport baseline: [`TELEPORT-REPORT.md`](./TELEPORT-REPORT.md).
