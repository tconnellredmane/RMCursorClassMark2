# AI Agent Documentation – Reference

## Full section outline (copy into ai-agent-reference.md)

Use this order. Omit or shorten sections that don’t apply (e.g. no “Deployment” for a library).

```markdown
# [Project Name] - AI Agent Reference

**Version:** x.y.z (optional)
**Last Updated:** YYYY-MM-DD
**Purpose:** Comprehensive reference for AI agents working with the [project] codebase

---

## Table of Contents
1. Application Identity & Purpose
2. Architecture Overview
3. Core Functional Capabilities
4. Critical Data Flows
5. Business Rules & Constraints
6. Data Transformation Pipeline
7. State Management
8. Invariants & Guarantees
9. Testing Strategy
10. Critical Patterns & Best Practices
11. Security Considerations
12. Performance Characteristics
13. Error Handling
14. Deployment & Operations

---

## 1. Application Identity & Purpose
- What the system does (1–2 paragraphs)
- Key use cases (3–5)
- Success criteria: what MUST NOT break
- Primary users/personas

## 2. Architecture Overview
- System components (diagram or list)
- Layer/module responsibilities
- Technology stack (table: component, technology, version, purpose)

## 3. Core Functional Capabilities
For each major component:
- Purpose and responsibilities
- Key methods/functions (signatures)
- Dependencies and interactions
- Error handling

## 4. Critical Data Flows
- Complete workflows: input → processing → output
- Data transformations at each stage
- State changes and side effects
- Error paths and recovery

## 5. Business Rules & Constraints
- Validation rules
- Immutable values / locked behavior
- Configuration constants
- Domain constraints

## 6. Data Transformation Pipeline
For each transformation:
- Input/output formats
- Invariants (what must always be true)
- Reversibility, side effects

## 7. State Management
- Where state is stored
- How state is mutated
- Synchronization and consistency
- Caching and invalidation

## 8. Invariants & Guarantees
- Data integrity (MUST/MUST NOT)
- Immutability requirements
- Consistency and atomicity
- Idempotency where applicable

## 9. Testing Strategy
- What to test and why
- Test categories (unit, integration, invariant)
- Coverage goals
- How to run tests

## 10. Critical Patterns & Best Practices
- Extension points
- Safe mutation patterns
- Common modifications
- Anti-patterns to avoid

## 11. Security Considerations
- Authentication/authorization
- Injection prevention
- Sensitive data handling

## 12. Performance Characteristics
- Caching strategy
- Known bottlenecks
- Scaling considerations

## 13. Error Handling
- How errors are represented
- Propagation and recovery
- Logging and monitoring

## 14. Deployment & Operations
- Build and deploy
- Configuration
- Health checks and observability
```

## Quick start / README structure

**AI-QUICKSTART.md** (5–10 min):

- What the system is (60 seconds)
- Architecture / data flow (2 min)
- Critical concepts (3–5 min)
- Quick tasks with code snippets
- Common pitfalls
- Code locations quick reference
- Next steps (links to full reference and index)

**README.md** (in AI docs folder):

- “Start here” and learning paths (quick vs comprehensive vs task-specific)
- Table of doc files with purpose and audience
- Key principles (3–5 MUST-know items)
- Architecture quick reference
- Testing: how to run, categories
- Learning path (e.g. Day 1–5)
- Finding information (by task, by component)
- Maintenance: when to update, review cycle

**AI-AGENT-INDEX.md** (task-based navigation):

- Quick start paths (fast / comprehensive / task-specific)
- Documentation by task: Understanding, Making changes, Configuring X, Debugging
- Links to ADRs or design docs
- Key concepts short reference
- Common patterns and solutions
- FAQ and debug checklist

## Test categories (when creating tests)

1. **Core logic** – Main algorithms, business logic, edge cases
2. **Transformation** – Correctness, no data loss, immutability, reversibility if applicable
3. **Invariant** – Guarantees hold, constraints enforced, error handling
4. **Integration** – End-to-end workflows, component interaction, state consistency

Use the project’s existing framework (xUnit, NUnit, pytest, Jest, etc.). Add fixtures and clear test names; reference tests from § 9 and § 10 of the main reference.

## Prompt snippets (for user invocation)

**Minimal ask (any project):**

```
Create AI agent reference documentation for this project. Use Documentation/AI Documentation/ 
(or docs/ai-documentation/) with ai-agent-reference.md as the main document. Include 
Application Identity, Architecture, Core Capabilities, Data Flows, Business Rules, 
Invariants, Testing Strategy, and Error Handling. Add a short quick start and an index 
for task-based navigation. Target 15–20 pages for critical paths.
```

**Full ask (medium/large project):**

```
Create comprehensive AI agent reference documentation for this project following the 
ai-agent-documentation skill. Output to Documentation/AI Documentation/ (or docs/ai-documentation/). 
Include all 14 sections, a 5–10 minute quick start (AI-QUICKSTART.md), and a task-based index 
(AI-AGENT-INDEX.md). Document [LANGUAGE] patterns (e.g. async, DI). Optionally add or extend 
tests and reference them in the doc. Target 30–50 pages.
```

**With focus:**

```
Create AI agent documentation for this project. Focus on [src/services/ and src/models/]. 
Emphasize [authentication, data pipeline]. Use [Documentation/AI Documentation/]. 
Include quick start and index.
```

## Language-specific bullets (document these when relevant)

| Language   | Patterns to document |
|-----------|------------------------|
| C#        | async/await, LINQ, DI, interfaces |
| Python    | async, decorators, context managers, type hints |
| TypeScript| Promises, async/await, types, module layout |
| Java      | Streams, annotations, lambdas, concurrency |
| Go        | Goroutines, channels, defer, interfaces, error handling |
| Rust      | Ownership, lifetimes, traits |

## Critical patterns to always cover

- **Mutation** – How to safely change data; immutability or copy strategies
- **Errors** – Representation, propagation, recovery, logging
- **Resources** – Acquisition/release, cleanup, pooling
- **Concurrency** – Thread/async safety, synchronization (if applicable)

## Source

This skill is derived from the AIResources “ai-agent-reference” templates (cursor rule, detailed template, quick start) and from generated outputs such as the mSQL project’s `Documentation/AI Documentation/` (ai-agent-reference.md, AI-QUICKSTART.md, AI-AGENT-INDEX.md, README.md).
