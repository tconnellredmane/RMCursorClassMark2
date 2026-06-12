---
name: create-adr
description: Generate Architecture Decision Records (ADRs) from decisions made in conversation. Use when the user asks to create an ADR, document a decision, write an architecture decision record, capture a plan of action as an ADR, or record a decision we just made.
---

# Create Architecture Decision Record (ADR)

Generates an ADR from the current conversation: extract the decision and context, fill the standard template, and place the file. Use when the user or agent has made a plan or decision and the user asks to document it as an ADR.

## When to Apply

- User says: "Create an ADR for this," "Document this decision," "Write an ADR for what we decided," "Record this as an ADR"
- After agreeing on a plan or approach and the user wants it captured
- When the user wants to extract a decision from the conversation into an ADR

## Workflow

1. **Gather from conversation**: Use the recent discussion to fill Context, Decision, Rationale, Consequences, and Alternatives. If anything is missing, ask the user briefly or infer from context.
2. **Determine location**: Use `Documentation/ADR/` if it exists; otherwise `docs/adr/` or `.cursor/adr/`. Create the directory if needed.
3. **Next number**: List existing `ADR-NNN-*.md` files in the ADR folder; use next sequential number (e.g. ADR-013).
4. **Filename**: `ADR-NNN-short-slug-from-title.md` (lowercase, hyphens).
5. **Write** the ADR using the template below. Status is "Accepted" if the decision is already made; "Proposed" if still under review.
6. **Update index**: If the project has an ADR index (e.g. `README.md` in the ADR folder), add an entry with title, status, date, and 1–3 key points.

## ADR Template

Use this structure. Omit optional sections (e.g. Implementation, References) if not needed.

```markdown
# ADR-NNN: Title (Short, Imperative)

**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Deprecated | Superseded
**Deciders**: [Who made the decision - team, role, or "User and development team"]

## Context

What is the issue or situation motivating this decision? What constraints or requirements exist?

## Decision

**The change we are making:** [One clear statement of the decision.]

## Rationale

Why this approach? What criteria drove the choice? Use subheadings if helpful (e.g. Security, Maintainability).

## Consequences

### Positive
- What becomes easier or better?

### Negative
- What becomes harder or what do we give up? Add mitigations if relevant.

### Neutral
- What stays the same or is unaffected?

## Alternatives Considered

- **Alternative 1**: [Name]. Rejected because [reason].
- **Alternative 2**: [Name]. Rejected because [reason].

## Notes

Future considerations, warnings, or follow-up decisions. Optional.
```

## Optional Sections (use when relevant)

- **Implementation**: Where in the codebase or config; file paths, key code.
- **Related Decisions**: Links to other ADRs or implicit decisions.
- **References**: URLs to docs, standards, or articles.

## Quality Checklist

- [ ] Context explains the *problem*, not just the solution
- [ ] Decision is one clear, testable statement
- [ ] Rationale ties to concrete criteria (e.g. security, cost, simplicity)
- [ ] Consequences are honest (negative and neutral included)
- [ ] At least one alternative is mentioned and rejected with a reason
- [ ] Date and Status are set; Deciders filled or left generic

## Index Entry Format

When the project has an ADR index (e.g. `Documentation/ADR/README.md`), add:

```markdown
### [ADR-NNN: Title](ADR-NNN-slug.md)
**Status**: Accepted
**Date**: YYYY-MM-DD

[1–3 sentence summary.]

**Key Points**:
- Point 1
- Point 2
```

## Tips

- Prefer concise Context and Rationale; move long implementation details to an **Implementation** or **Notes** section.
- If the user only says "create an ADR," infer the decision from the last 1–2 exchanges and show a draft for confirmation.
- For "Proposed" ADRs, say that the team can review and change status to "Accepted" after approval.

## Reference

Full template and more examples: [reference.md](reference.md)
