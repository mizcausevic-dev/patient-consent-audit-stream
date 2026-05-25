# Changelog

## 2026-05-25

### v0.1
- Shipped the third public Digital Health / MedTech control surface in the atlas expansion.
- Added consent-lane, audit-stream, revocation-posture, verification, and docs routes.
- Added KG Embedded tie-back documentation and browser-rendered README proof assets.

### v1.0-prod — production hardening (Claude Code · Platform/SRE)
- CI: Node 20 + 22 matrix running lint, typecheck, coverage, build, demo, smoke, and `npm audit --audit-level=high`.
- Tests: added `src/services/render.test.ts`; raised `src/services/` coverage to 100% statements / 100% functions (gate ≥ 60%).
- Tooling: added ESLint (flat config, typescript-eslint), Vitest v8 coverage gate, and `start`/`prerender`/`lint`/`typecheck`/`coverage` scripts.
- License: added AGPL-3.0-or-later `LICENSE` file.
- Dependabot: weekly npm + github-actions updates.
- Security: added `SECURITY.md` with HIPAA / regulated-data disclaimer (BAA + formal review required; do not deploy as-is); `npm audit --audit-level=high` wired into CI (0 known high/critical).
- HIPAA hygiene: all test fixtures are synthetic and marked `// SYNTHETIC TEST DATA`; no real PHI.
- Deploy: added `scripts/prerender.ts` (snapshots every route to flat host-agnostic `.html` plus the API surface as JSON under `site/`) and `.github/workflows/pages.yml` (GitHub Pages via Actions; `GITHUB_TOKEN` only — no external secrets). Custom domain `consent.kineticgain.com` via root `CNAME`.
- Repo hygiene: PR template, bug/feature issue templates, `outreach.md` scaffold, README badges + Production status block.
