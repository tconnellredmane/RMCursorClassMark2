---
name: create-adr-simple
description: Write an Architecture Decision Record (ADR) from a decision made in the current conversation. Use when the user says "create an ADR", "document this decision", or "write an ADR for what we decided".
---

# Create ADR (Simplified)

Extracts a decision from the current conversation and writes it as an ADR file using a standard template.

## When to Apply

- User says: "Create an ADR for this"
- User says: "Document this decision"
- User says: "Write an ADR for what we decided"
- After agreeing on an approach and wanting to capture it formally

## Workflow

1. **Extract from conversation**: Identify the decision, its context (what problem it solves), the key rationale, and the main consequences. If anything is unclear, ask briefly before writing.

2. **Determine location and filename**: Save to `docs/adr/` if it exists, otherwise `Documentation/ADR/`. Check for existing ADR files to determine the next number (ADR-001, ADR-002, etc.). Filename: `ADR-NNN-short-slug.md`.

3. **Write the file**: Use the template below. Status is "Accepted" if the decision is already made.

## Template

```markdown
# ADR-NNN: [Short Title — Imperative Phrase]

**Date**: YYYY-MM-DD
**Status**: Accepted

## Context

[What problem were we solving? What constraints or requirements shaped this decision?]

## Decision

[One clear statement of what we chose.]

## Rationale

[Why this approach? What criteria drove the choice?]

## Consequences

### What becomes easier
- 

### What becomes harder
- 
```
