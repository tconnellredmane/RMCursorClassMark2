# Exercise: Capstone Kickoff

## The Rule: No Agent Until You Have All Three

Before you write a single line of code, you must have:

- [ ] A written plan or brief (from a Plan mode conversation)
- [ ] A tech stack ADR (`docs/adr/ADR-001-stack-choice.md`)
- [ ] Project rules (`.cursor/rules/project-rules.mdc`)

Agent mode is locked until all three boxes are checked.

---

## Step 1 — Create Your Workspace

Create a new folder: `mcase-config-browser/`

Open it in Cursor. This is a blank workspace — you'll build everything from here.

---

## Step 2 — Plan the App (10 min)

Switch to **Plan mode**. Use this prompt:

```
I'm building a web app that lets configuration managers browse and search 
the mCase configuration API. The app needs to:
- Show a list of all datalists (label, system name, field count)
- Let users drill into a datalist to see its fields (type, required, picklist values)
- Show relationships between datalists (parent/child and links)
- Be searchable by datalist name and field name

I'm going to choose my tech stack as part of this planning process.

Before suggesting any code or architecture:
1. Ask me what constraints I have on the tech stack
2. Ask me what the primary use case is (who uses this, how often, on what device)
3. Ask me what "done" looks like by end of today's session

Then give me a brief summary of the architecture you'd suggest, including:
- Recommended tech stack and why
- How the app will call the mCase MCP tools
- Folder structure
```

Work through the conversation until you have a clear stack choice and a rough architecture in mind.

---

## Step 3 — Write the ADR (8 min)

Once you've chosen your stack, invoke your skill:

```
Create an ADR for our tech stack decision.
```

If your skill is working, it should extract the decision from the conversation and write `docs/adr/ADR-001-stack-choice.md`.

**Quality check:** Open the ADR. Does it contain your actual reasoning — not just "I chose React because it's popular"? Push for one concrete reason this stack makes sense *for this app and this team*.

---

## Step 4 — Set Up Project Rules (7 min)

Create `.cursor/rules/project-rules.mdc`. Start with the rules you drafted in the Rules Workshop. Add stack-specific rules now that you have a concrete stack.

Add these regardless of stack:
```
- Call the mCase MCP using Cursor's built-in tool calling; do not make direct HTTP calls to mCase
- Always show me the data shape before writing rendering code
- Stop after each checkpoint and wait for review before continuing
- Do not install packages without asking first
```

Add stack-specific rules (examples for React):
```
- Use functional components only; no class components
- Use React hooks for all state management
- Keep components under 150 lines; extract when larger
```

Save with frontmatter:
```
---
alwaysApply: true
---
```

---

## You're Ready

When all three boxes are checked, you're ready for the capstone build.

Take the break. When you come back, Agent mode is unlocked.
