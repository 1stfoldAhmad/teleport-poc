# Teleport PoC

This repository is a minimal, reusable Teleport-style engine scaffold for a visual builder that emits UIDL JSON as its source of truth and then uses generator packages to produce framework code.

## What this repo contains

- A sample `UIDL` source-of-truth document representing a visual scene/component
- A TypeScript entry point that shows how a builder JSON can be passed to Teleport generators
- A simple project structure to integrate into a custom app such as Tuari

## Commercial use and open-source status

The upstream TeleportHQ code generators are licensed under the MIT License.

This means:

- The code is open source
- Commercial use is allowed
- You may modify it
- You may redistribute it
- You must include the copyright and license notice in copies or substantial portions

The upstream repository was published under MIT and the package manifests explicitly declare `"license": "MIT"`.

## Important limitation

This open-source repository does not contain the proprietary drag-and-drop visual editor itself. The open-source package is the generator/UIDL engine layer, not the full Teleport visual builder UI. In other words:

- Visual builder UI: not included in the upstream open-source repo
- Builder state / JSON schema: included conceptually through UIDL
- Code generators: included and MIT licensed

The design pattern is:

1. The visual builder creates structured JSON (UIDL)
2. That JSON becomes the source of truth
3. Generator packages read the JSON and output code for React, Vue, Angular, etc.

## How to use it in Tuari

This repo is meant to be a starter integration boundary. In a Tuari app, you can:

- let your editor produce a UIDL JSON document
- save that JSON as your application state or project model
- pass it to Teleport generator packages to create code output

## Local usage

```bash
npm install
npm run generate
```

The sample generation flow reads a JSON model and invokes the React generator from the Teleport ecosystem.

## Upstream references

- Repository: https://github.com/teleporthq/teleport-code-generators
- License: MIT
- Generator package example: `@teleporthq/teleport-component-generator-react`

## License

This repository is distributed under the MIT License. See `LICENSE` for details.
