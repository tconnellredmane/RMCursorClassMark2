# Exercise: Rules Workshop

## Part 1 — Personal Rules (10 min)

Write 6-8 personal rules for your Cursor settings.

These apply globally — to everything you do in Cursor, on any project.

Open **Cursor Settings → Rules → User Rules** and add them there.

**Good categories to consider:**

| Category | Example |
|----------|---------|
| Error handling | "Use exceptions for unexpected errors. Never return null to signal failure." |
| Dependencies | "Do not install new packages without asking me first." |
| Code structure | "Keep functions under 40 lines. Extract when longer." |
| AI behavior | "Before writing code, state your assumptions. Wait for my confirmation." |
| Never do | "Do not create or modify .env files. Do not delete files without confirmation." |
| Testing | "Every new function needs at least one test. Test the happy path and one failure case." |

**Quality check before saving:** For each rule, ask — *"If Cursor violated this and I caught it, would I send it back?"* If yes, it's a real rule. If you'd let it slide, cut it.

---

## Part 2 — Project Rules for the Capstone (15 min)

Use **Plan mode** in Cursor to draft project rules for the mCase Config Browser.

**Use this prompt:**

```
I'm going to build a web app that browses the mCase configuration API. 
The app is for internal use by configuration managers.
I haven't chosen a tech stack yet — that's part of my architect process.

Draft a set of project rules (.cursor/rules/project-rules.mdc) for this project.
Focus on:
- Error handling philosophy (prefer exceptions over fallbacks)
- What Cursor should always stop and ask before doing
- What Cursor should never do without explicit instruction
- File structure expectations

Do NOT assume a tech stack. Write rules that apply regardless of framework.
Ask me any questions you need to write good rules.
```

Review the output. Edit until each rule is:
- An assertion, not a request
- Something you'd actually enforce
- Scoped appropriately

Save the result to `.cursor/rules/project-rules.mdc` with this frontmatter:

```
---
alwaysApply: true
---
```

---

## Part 3 — Peer Review (5 min)

Swap your personal rules with a neighbor. Give 3 minutes to critique:

- Are these assertions or requests?
- Are any obviously redundant (would any decent developer do this anyway)?
- Is there a rule missing that would prevent a common Cursor mistake?

Share one piece of feedback each.
