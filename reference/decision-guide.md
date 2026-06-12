# Cursor Toolbox — Decision Guide

## Which tool do I reach for?

| I need to... | Use a... |
|---|---|
| Enforce a coding standard on every interaction | Rule (`alwaysApply: true`) |
| Enforce a standard for specific file types | Rule (scoped with glob pattern) |
| Run a repeatable multi-step workflow | Skill |
| Give one-time instructions for this task | Prompt (typed in chat) |
| Give Cursor access to live data or external tools | MCP Server |
| Not sure yet | Prompt first — promote when you've needed it 3× |

**The promotion rule:**
- Typed it once → Prompt
- Typed it three times → Rule
- Multi-step process you repeat → Skill
- Cursor needs live external data → MCP

---

## What makes a good rule?

- An **assertion**, not a request: "Use async/await" not "Please try to use async/await"
- **Scoped** appropriately: global rules add cost to every request; scope aggressively
- **Enforceable**: if you caught Cursor violating it, you'd send the code back
- **Not obvious**: rules that restate basic good practice are noise

---

## What makes a good skill?

- A **clear trigger**: Cursor knows when to apply it
- A **step-by-step workflow**: specific enough to produce consistent output
- A **defined output format**: the artifact has a predictable shape
- **Minimal**: start with the least it needs to be useful; earn complexity through use

---

## When to start a fresh conversation

- Starting a new task or feature
- After completing a checkpoint
- When Cursor keeps making the same mistake
- After 3-5 back-and-forth correction turns
- When response quality is noticeably degrading

**Why it works:** Each new conversation gets a clean context. The old back-and-forth — which encodes a failure pattern — is gone. Fresh brief, fresh start.

---

## Plan > Code > Review

| Phase | Mode | What you do |
|---|---|---|
| **Plan** | Plan mode | Write the brief, state constraints, define non-goals, get agreement |
| **Code** | Agent mode | One checkpoint at a time; reference rules; start fresh between checkpoints |
| **Review** | Ask mode or human eyes | Verify against brief; find what's wrong; decide what to keep |

Never skip Plan for anything bigger than a bug fix.  
Never accept output without Review.

---

## What to never share with Cursor

- Credentials, API keys, passwords
- Customer PII or production data
- Proprietary trade secrets
- Internal security configurations

Use `.env` files and `.cursorignore` to keep these out of context.

---

## The mCase Capstone — Quick Reference

| Task | Tool | How |
|---|---|---|
| List all datalists | MCP | `schema` tool |
| Get datalist fields | MCP | `datalist_by_name` tool |
| Get relationships | MCP | `all_relationships` tool |
| Keep coding standards | Rules | `.cursor/rules/project-rules.mdc` |
| Write a stack ADR | Skill | `create-adr-simple` |
| Understand the MCP codebase | Skill | `ai-agent-documentation` |
