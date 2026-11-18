# Fortum Home Assistant Integration — Documentation Sitemap

Curated documentation entrypoint for human engineers and AI coding agents.

## Reading Priority Key
* **P1**: Essential context — read first for architecture, invariants, and setup.
* **P2**: Domain-specific reference — read when working on a specific subsystem or script.
* **P3**: Historical rationale — read when auditing design trade-offs or ADRs.

## Sitemap

| Priority | Category | Path | Audience | Description |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | Overview | [`README.md`](../README.md) | Human & Agent | Integration features, HACS installation, configuration, and entity/statistics catalog. |
| **P1** | Architecture | [`architecture/overview.md`](architecture/overview.md) | Human & Agent | Subsystem topology, Mermaid data flows, layer ownership, and architectural invariants. |
| **P1** | Developer | [`development.md`](development.md) | Human & Agent | Local dev environment, `uv` / `pytest` / `ruff` workflows, and frontend build steps. |
| **P2** | API / CLI | [`api/scripts.md`](api/scripts.md) | Human & Agent | CLI flags, arguments, dependencies, and exit codes for repository scripts. |
| **P2** | Frontend | [`dashboard.md`](dashboard.md) | Human & Agent | Custom `fortum-energy` Lovelace dashboard strategy, options, and debug export. |
| **P2** | External API | [`fortum-api.md`](fortum-api.md) | Human & Agent | Fortum cloud API endpoints, SSO auth flow, and hourly payload semantics. |
| **P3** | ADR Index | [`adr/README.md`](adr/README.md) | Human & Agent | Index of Architecture Decision Records (ADRs) for local fork changes. |
