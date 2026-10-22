# TeleportHQ `teleport-code-generators` — License, UIDL JSON & Visual Builder Report

**Date:** 2026-10-22
**Upstream repo:** https://github.com/teleporthq/teleport-code-generators (default branch: `development`, package version at inspection: `0.44.0`, ~1,117 stars / 183 forks)
**Scope of this document:** Report only — no code was extracted and no builder was built (per decision recorded 2026-10-22).
**Method:** Inspected the upstream repository source directly (shallow clone of `development`), its `LICENSE`, all 65 packages under `packages/`, `examples/uidl-samples/` + `examples/test-samples/`, the TypeScript sources in `packages/teleport-types/src/uidl.ts`, validator/generator entry points, and the `teleportHQ` GitHub org's public repo list.

---

## TL;DR — Direct answers to your questions

| # | Question | Answer |
|---|----------|--------|
| 1 | Is it open source? | **YES** — the `teleport-code-generators` repo is **MIT licensed** (Copyright © 2020 teleporthq). |
| 2 | Can I use it commercially? | **YES** — MIT permits commercial use, modification, distribution, sublicensing and sale. Only obligation: keep the copyright + permission notice in copies/substantial portions. No royalties, no copyleft. (See §1; this is a license summary, not legal advice.) |
| 3 | Can I extract its **visual builder** from this repo? | **NO — there is no visual builder in this repo.** All 65 packages are code generators, generator plugins, publishers, and the UIDL core (types/validator/builders). TeleportHQ's drag-and-drop editor (teleporthq.io) is a **closed-source SaaS product** and is not published in this repo or any other public `teleportHQ` repo found. There is nothing builder-shaped to extract. |
| 4 | Does the visual builder create a JSON file that is the source of truth? | **YES** — that JSON format is called **UIDL** (User Interface Definition Language). The builder (outside this repo) produces UIDL JSON; everything in this repo consumes it. Two shapes: `ComponentUIDL` and `ProjectUIDL`. Full structures in §4. |
| 5 | Do the generators use that JSON file for code generation? | **YES** — proven in source: `generateComponent(componentUIDL, …)` and `generateProject(projectUIDL, …)` take parsed UIDL JSON, validate it (`teleport-uidl-validator`), resolve it, then emit React / Vue / Angular / HTML / Next / Nuxt files. See §5. |
| 6 | What *can* be extracted for a Tauri app, then? | The **UIDL core engine**: `@teleporthq/teleport-types` + `teleport-uidl-validator` + `teleport-uidl-builders` (+ optionally `teleport-shared`). A visual builder UI would have to be **written from scratch by you** on top of that core — it does not exist to be copied. See §6. Nothing was built in this pass (report-only decision). |

---

## 1. License verdict — MIT, commercial use allowed

File: [`LICENSE`](https://github.com/teleporthq/teleport-code-generators/blob/development/LICENSE) at repo root (GitHub API also reports SPDX `MIT`).

```
MIT License
Copyright (c) 2020 teleporthq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, ...
```

### What MIT allows you to do
- ✅ Use it in a **commercial, closed-source** product (including a Tauri desktop app you sell).
- ✅ Copy, modify, merge, publish, distribute, sublicense and/or **sell** copies.
- ✅ Bundle the libraries inside your app binary without publishing your own source (MIT is **not** copyleft — unlike GPL, it does not force your app open).
- ✅ Use the UIDL JSON format itself as your app's file format.

### Your only obligations
1. **Keep the notice:** include `Copyright (c) 2020 teleporthq` + the MIT permission text in all copies or *substantial portions* of the software (e.g. a `NOTICE`/`THIRD-PARTY-LICENSES` file, or about-screen credits, in your distribution).
2. Accept it **"as is"** — no warranty; authors aren't liable for damages.

### Important caveats (not in the license text)
- **Trademark:** MIT grants copyright permission only — it does **not** grant rights to the "teleportHQ" name/logo. Don't brand your product as TeleportHQ or imply endorsement.
- **Scope:** This MIT grant covers *this repo's code*. It does **not** grant any rights to TeleportHQ's hosted visual editor, website, or SaaS, which are governed by their own terms.
- **Example content is not the same as code:** files like `examples/uidl-samples/project.json` are a dump of a real project ("Vow & Vest", 42 MB) containing real copy, SEO text and hosted asset URLs. The repo's MIT license covers the repository's software; treat third-party-looking content/assets in examples as **not yours to reuse commercially** (use them only as schema/test fixtures). When in doubt, strip example content.
- **Transitive dependencies:** the npm packages depend on other libraries (e.g. `deepmerge`, `jss`, `@babel/types`, `@mojotech/json-type-validation`). Those are also permissive (MIT/BSD-family), but run your own license scan (e.g. `license-checker`) before shipping.
- **No-license repos = danger:** some other `teleportHQ` org repos (e.g. `teleport-visual-repl`, last pushed 2023-01-05, no `LICENSE` file) are **all-rights-reserved by default**. "Public on GitHub" ≠ open source. Do not copy code from repos without a license into a commercial product.
- This section is a plain-English summary by an engineering agent, **not legal advice**. For a commercial launch, have a lawyer confirm.

---

## 2. What is actually in the repo (and what is not)

Root `package.json` describes it accurately: *"Code generators and UIDL definition library"*. All 65 packages under `packages/`:

| Group | Packages | Purpose |
|-------|----------|---------|
| **UIDL core (the "engine")** | `teleport-types`, `teleport-uidl-validator`, `teleport-uidl-builders`, `teleport-uidl-resolver`, `teleport-shared` | UIDL TypeScript types, JSON schema validation/decoding, programmatic UIDL construction helpers, element mapping/resolution, shared utils |
| Component generators | `teleport-component-generator`, `-react`, `-Vue`, `-angular`, `-html` | `ComponentUIDL → component files` |
| Project generators | `teleport-project-generator`, `-react`, `-next`, `-Vue`, `-nuxt`, `-angular`, `-html` | `ProjectUIDL → whole project files` |
| Facade / packer | `teleport-code-generator`, `teleport-project-packer`, `teleport-github-gateway` | Combined API: generate → pack → publish |
| Generator plugins (~30) | `teleport-plugin-*`, `teleport-project-plugin-*` | JSX/CSS/routing/head/styling transformations during generation |
| Post-processors | `teleport-postprocessor-prettier-*`, `-vue-file` | Formatting emitted code |
| Publishers | `teleport-publisher-disk`, `-zip`, `-github`, `-vercel`, `-netlify`, `-codesandbox` | Writing generated files out |
| Test hats | `teleport-test` | Internal testing |

**Not present anywhere:** canvas/drag-and-drop editor, selection/inspector UI, undo/redo store, builder state — i.e. *no visual builder*. A search of the full `teleportHQ` org (48 public repos) found generators, project templates, docs, REPL experiments and the vision API — no open-source release of the teleporthq.io editor. The README itself frames the repo as the downstream half: *"The glue between the platform and the code generators is the UIDL Standard"* — the "platform" (builder) is the separate, closed product.

---

## 3. Architecture — how UIDL JSON is the source of truth

```
┌─────────────────────────────┐
│  TeleportHQ Visual Builder   │   ← closed-source SaaS (teleporthq.io), NOT in this repo
│  (drag & drop editor)        │     Any other tool (e.g. a future builder you write
└──────────────┬──────────────┘     for Tauri) can sit here instead.
               │  produces / edits
               ▼
┌─────────────────────────────┐
│  UIDL JSON  ★ SOURCE OF TRUTH│   ComponentUIDL  /  ProjectUIDL
│  (framework-agnostic UI      │   Defined by teleport-types (TS interfaces)
│   description)               │   + published JSON Schemas (docs.teleporthq.io/uidl-schema/v1/)
└──────────────┬──────────────┘
               │  consumed by everything below (all MIT, in this repo)
               ▼
   teleport-uidl-validator  →  teleport-uidl-resolver  →  component/project generators + plugins
        (schema + content         (abstract elementTypes        │
         validation, parsing)      → concrete HTML/framework)    ▼
                                                     React / Vue / Angular / HTML / Next / Nuxt files
```

Key consequence for your Tauri plan: **UIDL describes the resulting UI, not builder state.** It has no fields for canvas zoom, selection, panel layout, or undo history. A builder must keep its own editor state separately and serialize the document to/from UIDL JSON.

---

## 4. The UIDL JSON structure (from `examples/` and `teleport-types`)

There are two document types. `ComponentUIDL` = one component. `ProjectUIDL` = a whole site/app whose `root` is a router component and whose `components` map holds reusable `ComponentUIDL`s.

### 4.1 `ComponentUIDL` — annotated skeleton

TypeScript source: `packages/teleport-types/src/uidl.ts` → `export interface ComponentUIDL`.

```jsonc
{
  "name": "PersonSpotlight",                 // required: component name
  "propDefinitions": {                        // optional: props (inputs) with defaults
    "name":  { "type": "string", "defaultValue": "John Doe" },
    "config":{ "type": "object", "defaultValue": { "height": 30, "width": 30 } }
  },
  "stateDefinitions": {                       // optional: internal state
    "isVisible": { "type": "boolean", "defaultValue": true }
  },
  "styleSetDefinitions": { /* reusable style sets / classes */ },
  "importDefinitions":   { /* external deps this component imports */ },
  "designLanguage": { "tokens": { /* design tokens */ } },
  "seo": { /* per-component SEO (for pages) */ },
  "node": { /* REQUIRED: the root UIDLNode — the actual UI tree, see 4.3 */ }
}
```

### 4.2 Real example — `examples/test-samples/component-sample.json` (complete, 3.9 KB)

This is the cleanest small example in the repo. It exercises props, state, static/dynamic values, an event, a `repeat` and a `conditional`:

```json
{
  "name": "New UIDL",
  "propDefinitions": {
    "header": { "type": "string", "defaultValue": "Hello" },
    "items":  { "type": "array",  "defaultValue": [] },
    "fields": { "type": "object", "defaultValue": { "alt": "some text" } }
  },
  "stateDefinitions": {
    "isVisible": { "type": "boolean", "defaultValue": true }
  },
  "node": {
    "type": "element",
    "content": {
      "elementType": "container",
      "attrs": {
        "data-static-attr":  { "type": "static",  "content": "test" },
        "data-dynamic-attr": { "type": "dynamic", "content": { "referenceType": "prop", "id": "header" } }
      },
      "children": [
        {
          "type": "element",
          "content": {
            "elementType": "text",
            "children": [
              { "type": "static",  "content": "Hello World!" },
              { "type": "dynamic", "content": { "referenceType": "prop", "id": "header" } },
              {
                "type": "element",
                "content": {
                  "elementType": "button",
                  "events": {
                    "click": [{ "type": "stateChange", "modifies": "isVisible", "newState": true }]
                  },
                  "children": [{ "type": "static", "content": "Update me!" }]
                }
              }
            ]
          }
        },
        {
          "type": "repeat",
          "content": {
            "node": {
              "type": "element",
              "content": {
                "elementType": "text",
                "children": [
                  { "type": "dynamic", "content": { "referenceType": "local", "id": "item" } }
                ]
              }
            },
            "dataSource": { "type": "dynamic", "content": { "referenceType": "prop", "id": "items" } },
            "meta": { "useIndex": true, "iteratorName": "item" }
          }
        },
        {
          "type": "conditional",
          "content": {
            "reference": { "type": "dynamic", "content": { "referenceType": "state", "id": "isVisible" } },
            "value": true,
            "node": {
              "type": "element",
              "content": {
                "elementType": "text",
                "children": [{ "type": "static", "content": "Now you see me!" }]
              }
            }
          }
        }
      ]
    }
  }
}
```

*(One `fields` sub-key and a nested `list` attr abridged for print; the file itself is the fixture the repo's own tests run against. A richer styling example is `examples/uidl-samples/component.json` — "PersonSpotlight", 6.5 KB — showing inline `style` objects, `image` with `attrs.url`, `link`, `textblock`, nested dynamic styles bound to `$props.config.height`, etc.)*

### 4.3 The node tree — `UIDLNode` types

Every UI is a tree of nodes discriminated by `type` (union in `uidl.ts`, `export type UIDLNode`):

| `type` | Meaning | `content` shape |
|--------|---------|-----------------|
| `element` | A UI element (the workhorse) | `UIDLElement` (below) |
| `static` | Literal value (text/number/bool/…) | the literal value |
| `dynamic` | Bound value | `{ referenceType: "prop"\|"state"\|"local"\|"global"\|…, id, refPath?: string[] }` |
| `repeat` | List rendering (`.map`) | `{ node, dataSource, meta?: { iteratorName, useIndex } }` |
| `conditional` | Show-if | `{ node, reference, value?, condition? }` |
| `slot` | Component children placeholder | `{ name?, fallback? }` |
| `raw` | Raw string (e.g. embed HTML) | string |
| `expr` | Raw JS expression string | string |
| `cms-list` / `cms-item` / `cms-mixed-type`, `data-source-*`, `date-time-node`, `inject`, import refs | Newer CMS / data-source / special nodes | varies (see `uidl.ts`) |

An **element** (`UIDLElement`) — this is what a builder's canvas items serialize to:

```jsonc
{
  "type": "element",
  "content": {
    "elementType": "container",        // ABSTRACT type, not an HTML tag (see list below)
    "semanticType": "Sample",          // optional: when elementType = "component", which component
    "name": "hero-section",             // optional: builder-given node name
    "dependency": { "type": "local" },  // optional: local component / npm package dependency
    "style": { "width": "300px", "padding": "10px" },   // CSS-ish map; values may themselves be
                                        //   static strings OR dynamic bindings to props/state
    "attrs": { "url": { "type": "dynamic", "content": { "referenceType": "prop", "id": "link" } } },
    "events": { "click": [ { "type": "stateChange", "modifies": "isVisible", "newState": false } ] },
    "referencedStyles": { /* shared style-set / media / pseudo-state styles */ },
    "abilities": { "link": { /* makes element act as a link */ } },
    "children": [ /* UIDLNode[] — recurse */ ],
    "selfClosing": true                 // optional
  }
}
```

**Abstract `elementType`s** (from `teleport-uidl-resolver/src/html-mapping.ts` — the resolver later maps these to real tags, e.g. `container → div`, `text → span`, `image → img`):

`container, group, text, textblock` (used in samples)`, linebreak, image, html-node, markdown-node, rich-text-editor-node, collapsible-text, date-time-node, lottie-node, model-viewer-node, textinput, passwordinput, numberinput, checkbox, radiobutton, textarea, link, navlink, prop-link, button, form, list, dropdown, video, audio, picture, source, icon, separator, fragment` — plus `component` (with `semanticType` + `dependency`) for nested components. Unknown/custom strings are also possible via custom mappings.

Two legacy shortcuts you'll see in real builder-exported files: string children like `"$props.displayLink"` and `"url": "$props.url"` — the `Parser` in `teleport-uidl-validator` expands these into full `dynamic` nodes before validation.

### 4.4 `ProjectUIDL` — annotated skeleton

TypeScript source: `packages/teleport-types/src/uidl.ts` → `export interface ProjectUIDL`. Small real fixture: `examples/test-samples/project-sample.json` (15 KB). Full-scale real export: `examples/uidl-samples/project.json` (**42 MB**, project "Vow & Vest", 24 components, ~68 routed pages — do not commit copies of this casually).

```jsonc
{
  "name": "My Project",
  "globals": {
    "settings": { "language": "en", "title": "teleportHQ" },
    "meta":     [ { "name": "viewport", "content": "width=device-width, initial-scale=1.0" } ],
    "assets":   [ { "type": "style", "path": "https://…/normalize.min.css" } ],
    "manifest": { "theme_color": "#822CEC", "icons": [ /* … */ ] },
    "variables": { /* env-like globals */ }
    // newer exports also carry: env, customCode …
  },
  "root": {                                     // a ComponentUIDL whose job is ROUTING
    "name": "App",
    "stateDefinitions": {
      "route": {                                // ★ pages are values of the `route` state
        "type": "string",
        "defaultValue": "index",
        "values": [
          { "value": "index", "pageOptions": { "navLink": "/",      "fileName": "index", "componentName": "Home" } },
          { "value": "about", "pageOptions": { "navLink": "/about", "fileName": "about", "componentName": "About" } }
          // real exports add per-page: seo{title,metaTags,assets}, pageId,
          // pageOptions.stateDefinitions / propDefinitions, dynamicRouteAttribute …
        ]
      }
    },
    "styleSetDefinitions": { /* global style sets */ },
    "node": {
      "type": "element",
      "content": {
        "elementType": "Router",
        "children": [                           // one `conditional` per page:
          { "type": "conditional",
            "content": {
              "reference": { "type": "dynamic", "content": { "referenceType": "state", "id": "route" } },
              "value": "index",
              "node": { /* … the page's element tree, or a component element … */ }
            } }
        ]
      }
    }
  },
  "components": {                               // reusable components, keyed by name
    "OneComponent":   { /* ComponentUIDL */ },
    "ExpandableArea": { /* ComponentUIDL */ }
  },
  // Optional, present in modern real-world exports (see uidl.ts):
  "resources":              { /* API resources / fetch definitions */ },
  "forms":                  { /* form definitions */ },
  "dataSources":            { /* REST / Postgres / Supabase / … connections */ },
  "authentication":         { /* providers, roles, page protection */ },
  "workflows":              { /* server workflows */ },
  "globalStateDefinitions": { /* app-wide state */ },
  "internationalization":   { /* locales + translations */ },
  "invoiceSettings": {}, "ecommerceSettings": {}, "paymentSettings": {}, "blogSettings": {}
}
```

In the real 42 MB `project.json`, top-level keys are exactly:
`name, globals{settings, assets, env, meta, customCode}, forms, dataSources, workflows, authentication, globalStateDefinitions, invoiceSettings, ecommerceSettings, root{name, designLanguage, styleSetDefinitions, stateDefinitions{route}, propDefinitions, node}, components{…24 entries…}, resources` — and `root.node` is a `Router` element with one `conditional` child per route value, as sketched above.

### 4.5 All example JSON files in the repo

| File | Size | What it is |
|------|------|------------|
| `examples/uidl-samples/component.json` | 6.5 KB | `ComponentUIDL` "PersonSpotlight" — props, styles, image/link, dynamic bindings |
| `examples/uidl-samples/project.json` | **42 MB** | Real full `ProjectUIDL` export ("Vow & Vest") — routing, 24 components, data sources, auth, ecommerce |
| `examples/uidl-samples/{caisy,contentful,flotiq,strapi,wordpress}.json` | 135–213 KB each | CMS-driven project UIDLs |
| `examples/uidl-samples/tests.json` | 480 KB | Test fixture bundle |
| `examples/test-samples/component-sample.json` | 3.9 KB | Minimal canonical component (shown in §4.2) |
| `examples/test-samples/component-html.json` | 6.5 KB | Component fixture for HTML generator |
| `examples/test-samples/project-sample.json` | 15 KB | Minimal canonical project (3 pages, 4 components) |
| `examples/test-samples/project-{sample-with-dependency,with-only-tokens,with-slot,with-import-global-styles}.json` | 18–28 KB | Focused project fixtures |
| `examples/test-samples/{component,project}-invalid-sample.json` | 3–8 KB | Deliberately invalid — validator test fixtures |
| `examples/test-samples/comp-style-overrides.json`, `html-image-use-cases.json` | 210 KB / 27 KB | Style/image edge-case fixtures |

Official machine-readable schemas are also published: `https://docs.teleporthq.io/uidl-schema/v1/component.json` and `…/project.json` (linked from the repo README).

---

## 5. "Do the generators use that JSON for code generation?" — YES ✅

Evidence from source (`development` @ `0.44.0`):

- `packages/teleport-code-generator/src/index.ts` exports
  `generateComponent(componentUIDL, …)` → delegates to a framework component generator;
  same package exposes the project pipeline (`createProjectPacker` + per-framework project generators + publishers).
- `packages/teleport-component-generator/src/index.ts` → `generateComponent(input)`:
  1. `validator.validateComponentSchema(input)` (or root-component variant) from `@teleporthq/teleport-uidl-validator`,
  2. `Parser` normalizes the JSON (expands `$props.*` shortcuts etc.),
  3. `validator.validateComponentContent(uidl)`,
  4. resolver + plugins transform the node tree → framework files.
- `packages/teleport-project-generator/src/index.ts` → `generateProject(input)`: same pattern with `validateProjectSchema` / `validateProjectContent`.
- README usage is literally: `const uidl = { … } // your sample here` → `await ReactGenerator.generateComponent(uidl)`.

So the data flow you described is correct: **builder → UIDL JSON (source of truth) → generators → code**. The first box is simply not open source.

---

## 6. What "extract the core engine" would actually mean (for a future Tauri build)

Nothing in this section was built or extracted (report-only decision); it records the accurate option so a later go-ahead starts from facts. Your recorded preferences if/when this proceeds: **React + Vite + TypeScript**, **web-first, Tauri-ready structure**, builder scope undecided ("none" for now).

The reusable, MIT, generator-free core is:

| Package (npm: `@teleporthq/…`, v0.44.0) | Role in your builder | Deps |
|---|---|---|
| `teleport-types` | `ComponentUIDL` / `ProjectUIDL` / `UIDLNode` TS types — your document model | none |
| `teleport-uidl-validator` | `Validator` + `Parser` + decoders — guarantee every saved JSON is valid UIDL | `teleport-shared`, `teleport-types`, `@mojotech/json-type-validation` |
| `teleport-uidl-builders` | Helper constructors for creating UIDL nodes/components programmatically | `teleport-types` |
| `teleport-shared` *(optional)* | Constants/utils the validator needs; some runtime helpers | `teleport-types`, `@babel/types`, `jss` |
| `teleport-uidl-resolver` *(optional, borderline)* | Maps abstract `elementType`s → HTML (useful for a **preview renderer**); arguably generation-side, include only if wanted | `teleport-shared`, `teleport-uidl-builders`, `deepmerge` |

Explicitly **excluded** per your instruction: every `teleport-*-generator*`, `teleport-plugin-*`, `teleport-postprocessor-*`, `teleport-publisher-*`, `teleport-project-packer`, `teleport-code-generator`.

A from-scratch builder on top of that core would need (none of this exists upstream): canvas + drag/drop, layer tree, style/attrs/events inspector, props/state editors, pages/routes UI (editing `root.stateDefinitions.route` + the Router's conditionals), a UIDL→DOM preview renderer, undo/redo + editor state, and Tauri file I/O (open/save `.json`). Because it's your own new code + MIT libraries, the resulting Tauri app can be commercial/closed-source — subject to keeping the MIT notice per §1.

---

## 7. Risks & notes before committing to UIDL

1. **Moving target:** `uidl.ts` is large and actively evolving (CMS nodes, data sources, auth, ecommerce, workflows were layered on over time; older samples use `$props.*` string shortcuts). Pin exact versions (`0.44.0`) and validate on load/save.
2. **Scale:** real `ProjectUIDL` exports reach tens of MB with deeply nested trees — a builder needs virtualization/lazy rendering, not naive full-tree React renders.
3. **Builder state isn't in UIDL** (see §3): plan a separate editor-state model alongside the document.
4. **Fidelity:** supporting 100% of modern UIDL (data sources, auth, workflows…) is a product-sized effort. A `ComponentUIDL`-first v1 is far more tractable than full `ProjectUIDL`.
5. **License hygiene:** keep the teleporthq MIT notice; avoid teleportHQ branding; don't lift code from no-license org repos; strip real project content from example fixtures.

---

## Appendix — sources

- License: https://github.com/teleporthq/teleport-code-generators/blob/development/LICENSE
- Repo: https://github.com/teleporthq/teleport-code-generators (packages: `packages/`, examples: `examples/uidl-samples/`, `examples/test-samples/`)
- Types: `packages/teleport-types/src/uidl.ts` (`ComponentUIDL`, `ProjectUIDL`, `UIDLNode`, `UIDLElement`)
- Element mapping: `packages/teleport-uidl-resolver/src/html-mapping.ts`
- Generator entry points: `packages/teleport-code-generator/src/index.ts`, `packages/teleport-component-generator/src/index.ts`, `packages/teleport-project-generator/src/index.ts`
- JSON Schemas: https://docs.teleporthq.io/uidl-schema/v1/component.json · https://docs.teleporthq.io/uidl-schema/v1/project.json
- Org survey: https://github.com/teleportHQ (48 public repos; no visual-builder release; `teleport-visual-repl` has no license file)
