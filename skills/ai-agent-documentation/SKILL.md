---
name: ai-agent-documentation
description: Generate comprehensive AI agent reference documentation and optional test suite for any codebase. Use when the user asks to create AI agent documentation, generate AI reference docs, set up AI documentation for this project, document the codebase for AI agents, or create documentation following the AI agent reference template.
---

# AI Agent Documentation Generator

Generates comprehensive, structured documentation so AI agents (and developers) can understand and change a codebase confidently. Works for any language and project size. Based on the AIResources documentation tools and proven in projects like mSQL.

## When to Apply

- User says: "Create AI agent documentation," "Generate AI reference docs for this project," "Set up AI documentation," "Document this codebase for AI agents," "Create documentation following the AI agent reference template"
- User wants onboarding material for AI agents or new developers
- User is preparing for refactoring or handoff and needs invariants and patterns captured

## Workflow

### 1. Clarify scope and location

- **Scope**: Full (30–50+ pages, all sections) or minimal (15–20 pages, critical paths). Ask if unclear.
- **Output location**: Prefer `Documentation/AI Documentation/` if it exists; else `docs/ai-documentation/` or `docs/`. Create the directory if needed.
- **Focus**: User can specify directories (e.g. `src/`, `app/`), components, or patterns to emphasize.
- **Language/framework**: Identify from codebase or ask (e.g. C#, Python, TypeScript, Java, Go).

### 2. Analysis phase

Before writing, briefly analyze:

- README, package.json / requirements.txt / solution file: purpose, tech stack, entry points
- Source layout: main modules, services, models, utilities
- Existing docs: ADRs, README, architecture files to reference or link
- Test layout: where tests live and which framework

### 3. Generate documentation

Create the main reference and supporting files.

**Primary document**: `ai-agent-reference.md` in the chosen output folder.

**Required sections** (use this order; omit or shorten sections that don’t apply):

1. **Application Identity & Purpose** – What the system does, key use cases, success criteria (what must NOT break), primary users/personas
2. **Architecture Overview** – System components, layer responsibilities, technology stack (table)
3. **Core Functional Capabilities** – For each major component: purpose, key methods/API, dependencies, error handling
4. **Critical Data Flows** – End-to-end workflows, input → processing → output, transformations, error paths
5. **Business Rules & Constraints** – Validation rules, immutable values, configuration constants, domain constraints
6. **Data Transformation Pipeline** – Input/output formats, invariants, reversibility, side effects
7. **State Management** – Where state lives, how it changes, synchronization, caching and invalidation
8. **Invariants & Guarantees** – Data integrity, immutability, consistency, idempotency; use MUST/MUST NOT
9. **Testing Strategy** – What to test, test categories, coverage goals, how to run tests
10. **Critical Patterns & Best Practices** – Extension points, safe mutation, common modifications, anti-patterns
11. **Security Considerations** – Auth, injection prevention, sensitive data (if relevant)
12. **Performance Characteristics** – Caching, bottlenecks, scaling (if relevant)
13. **Error Handling** – How errors are represented, propagation, recovery, logging
14. **Deployment & Operations** – Build, deploy, config, health (if relevant)

**Style**:

- Use MUST / MUST NOT / SHOULD for requirements. Explain WHY, not only WHAT.
- Code examples in the project’s language. Clear section headers and table of contents.
- Link to ADRs or other docs where decisions are explained. No user-facing how-to that belongs in a separate user guide.

### 4. Supporting documents (create as appropriate)

- **README.md** (in the AI docs folder) – Overview, “Start here,” learning paths, links to quick start and index
- **AI-QUICKSTART.md** – 5–10 minute onboarding: what the system is, main architecture, critical concepts, quick tasks, common pitfalls, “next steps”
- **AI-AGENT-INDEX.md** (or INDEX) – Task-based navigation: “Understanding the system,” “Making changes,” “Configuring X,” “Debugging”; links to sections and other docs
- **implementation-summary.md** (optional) – What was created and why, for this round of doc generation
- **knowledge-base/** (optional) – Domain-specific references (e.g. widget config, API surface) as separate files; link from main reference and index

### 5. Optional: test suite

If the user wants tests as part of the process:

- Use the project’s existing test framework (xUnit, pytest, Jest, etc.). Don’t introduce a new one without asking.
- Add or extend: core logic tests, transformation tests, invariant/constraint tests, integration tests.
- Add or update `tests/README.md` (or equivalent) with how to run tests and coverage goals.
- In the main reference, cross-reference tests in § Testing Strategy and § Critical Patterns.

### 6. Quality checklist

Before finishing, confirm:

- [ ] All major components and flows covered (or explicitly scoped out)
- [ ] Invariants and guarantees stated with MUST/MUST NOT
- [ ] Business rules and constraints documented
- [ ] Error handling and recovery described
- [ ] Examples and code snippets in project language
- [ ] New readers (or AI) can find entry points (README, quick start, index)
- [ ] If tests were requested: tests run and are referenced in the docs

## Scope by project size

| Size        | Target length   | Focus                          | Tests        |
|------------|-----------------|---------------------------------|-------------|
| Small (&lt;5K)  | 15–20 pages      | Critical paths, core APIs      | Optional, minimal |
| Medium (5–20K) | 30–50 pages      | Full sections, main flows      | Recommended |
| Large (&gt;20K) | 50+ pages / split | Full + optional split by subsystem | Recommended |

## Language-specific notes

Document patterns that matter for the stack (concise; no generic tutorials):

- **C#**: async/await, LINQ, DI, interfaces
- **Python**: async, decorators, context managers, type hints
- **TypeScript/JavaScript**: Promises, async/await, types, module layout
- **Java**: Streams, annotations, lambdas, concurrency
- **Go**: Goroutines, channels, defer, interfaces, error handling
- **Rust**: Ownership, lifetimes, traits

## Output paths (convention)

- Prefer: `Documentation/AI Documentation/` (match mSQL-style layout)
- Else: `docs/ai-documentation/` or `docs/`
- Main file: `ai-agent-reference.md`
- Keep paths in docs relative (e.g. `../ADR/`) so they work in version control.

## Maintenance

- **When to update**: New features, bug fixes that reveal new invariants, refactors, business rule or config changes.
- **What to update**: Relevant sections in `ai-agent-reference.md`, quick start if concepts change, index if structure changes, tests and test README if behavior changes.
- Suggest a short review cycle (e.g. monthly for accuracy, per-release for completeness).

## Reference

- Full section template and prompt snippets: [reference.md](reference.md)
