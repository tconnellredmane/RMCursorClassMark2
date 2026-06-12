# Exercise: Skills Workshop

## Background

A Cursor skill is a structured instruction document (SKILL.md) that Cursor reads when you invoke it. It tells Cursor what the skill does, when to apply it, and exactly how to execute it.

You're going to build a simplified `create-adr` skill from scratch. You'll use it in the capstone to document your tech stack decision.

---

## Step 1 — Design the Skill with Plan Mode (8 min)

Open a **Plan mode** conversation. Use this prompt:

```
I want to build a Cursor skill that writes an Architecture Decision Record (ADR).
Help me design the minimum viable version — just enough to be useful, nothing extra.

The skill should:
- Detect when a user wants to write an ADR
- Extract the decision from the current conversation
- Write a file using a standard template

What's the minimum structure this skill needs?
What sections should the ADR template contain?
```

Take notes on what Plan mode suggests. You'll write the SKILL.md yourself in Step 2.

---

## Step 2 — Write the SKILL.md (12 min)

Create the file: `cursor-workshop/skills/create-adr-simple/SKILL.md`

Your skill must have these three sections:

### Section 1: Frontmatter and header
```markdown
---
name: create-adr-simple
description: Write a one-line description of when to use this skill.
---

# Create ADR (Simplified)
```

### Section 2: When to Apply
List 3 trigger phrases — what would a user say to invoke this skill?

Example format:
```markdown
## When to Apply
- User says: "Create an ADR for this"
- User says: "Document this decision"
- After agreeing on an approach and wanting to capture it
```

### Section 3: Workflow
Write 3 steps the skill should follow. Be specific — Cursor executes these steps.

Example step format:
```markdown
## Workflow
1. **Extract from conversation**: Identify the decision, its context, and the key reasons.
2. **Determine location**: Save to `docs/adr/` if it exists, otherwise `Documentation/ADR/`.
3. **Write the file**: Use the template below. Filename: `ADR-001-short-title.md`.
```

### Section 4: Template
Include the ADR template the skill will fill in:

```markdown
## Template

# ADR-NNN: [Short Title]

**Date**: YYYY-MM-DD
**Status**: Accepted

## Context
[What problem were we solving? What constraints existed?]

## Decision
[What did we choose?]

## Rationale
[Why this approach over alternatives?]

## Consequences
### What becomes easier
- 

### What becomes harder
- 
```

**Target length:** 30-50 lines. If you're over 60, ask what you can cut.

---

## Step 3 — Test It (5 min, if time allows)

In a new Cursor chat, reference your skill and say:

```
I just decided to use React + Vite for my web app because my team knows 
React well and Vite gives us fast hot reload. Create an ADR for this decision.
```

Does the output look right? Does it save to the right location?

---

## After the Exercise

We'll compare your simplified skill to the production `create-adr` skill.

Questions to think about:
- What did the production version add?
- Which additions would you want after using the skill a few times?
- Which additions would you skip entirely?
