# ADR Reference

## Full Template (copy-paste baseline)

```markdown
# ADR-NNN: [Title]

**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Deprecated | Superseded
**Deciders**: [Who]

## Context
[Problem, constraints, requirements]

## Decision
** [One-sentence decision.] **

## Rationale
[Why this approach; criteria]

## Consequences
### Positive
- 

### Negative
- 

### Neutral
- 

## Alternatives Considered
- **Option A**: Rejected because 
- **Option B**: Rejected because 

## Notes
[Optional]
```

## Status Values

| Status       | Meaning |
|-------------|--------|
| Proposed    | Under review; not yet accepted |
| Accepted    | Decided and (optionally) implemented |
| Deprecated  | No longer followed |
| Superseded  | Replaced by another ADR (link it in Notes) |

## When to Create an ADR

- Significant architectural or design decision
- Choosing between multiple approaches
- Non-obvious solution to a complex problem
- Establishing a pattern or practice for the project
- Deprecating or changing a prior decision

## Typical Workflow (project lifecycle)

1. **Create** – Write ADR with status "Proposed"
2. **Review** – Discuss with team/stakeholders
3. **Decide** – Set status to "Accepted" or reject
4. **Implement** – Make the changes
5. **Reference** – Link to the ADR in code/comments where relevant

## Example (minimal)

```markdown
# ADR-001: Use SQLite for Local Cache

**Date**: 2025-02-01
**Status**: Accepted
**Deciders**: Development Team

## Context

The app needs a local cache for offline support. We need a simple, file-based store with no separate server.

## Decision

**Use SQLite for the local cache, with a single database file per user.**

## Rationale

- Single file simplifies backup and portability
- No extra process or server
- Good enough performance for expected data size
- Widely supported across platforms

## Consequences

### Positive
- Simple deployment and backup
- No additional infrastructure

### Negative
- Not ideal for very high write concurrency (acceptable for our use case)

### Neutral
- Cache location is configurable via path

## Alternatives Considered

- **JSON files**: Rejected – no querying, harder to keep consistent under concurrent access.
- **Embedded Postgres**: Rejected – heavier and more operational complexity than we need.

## Notes

If we outgrow SQLite, we can add an abstraction layer and swap the backend.
```

## Resources

- [ADR best practices](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub](https://adr.github.io/)
