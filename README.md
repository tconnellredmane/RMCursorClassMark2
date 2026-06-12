# Cursor Workshop — MkIII

**Cursor for Developers: The Architect's Approach**

This folder contains everything you need for the class exercises, capstone, and reference materials.

---

## What's Here

```
cursor-workshop/
├── exercises/          Hands-on exercise sheets (one per section)
├── reference/          Decision guide + prompting patterns (keep these open)
├── skills/             Cursor skills — installable and reference
│   ├── create-adr-simple/   The skill YOU build in Section 5
│   ├── create-adr/          The production version (for comparison)
│   └── ai-agent-documentation/  Used in Section 6 for the MCP exercise
├── mcp/                MCP configuration and setup
│   ├── mcp.json        Paste this into your Cursor MCP settings
│   └── setup.md        Step-by-step setup + troubleshooting
├── mcp-server-source/  The mCase MCP server source code (for Section 6)
└── slides/             Presentation slides (open index.html in a browser)
```

---

## Before Class: Setup Checklist

### 1. Install the MCP server
Follow the instructions in `mcp/setup.md`. This must be done before the afternoon session.

**Quick version:**
- Open Cursor Settings → MCP
- Add the configuration from `mcp/mcp.json` (credentials provided in class)
- Restart Cursor
- Verify: ask Cursor "Use the mCase MCP to list all datalists"

### 2. Install the skills
Follow the instructions in `skills/README.md`.

**Quick version (Windows):**
```
mkdir %USERPROFILE%\.cursor\skills
xcopy /E /I cursor-workshop\skills\create-adr %USERPROFILE%\.cursor\skills\create-adr
xcopy /E /I cursor-workshop\skills\ai-agent-documentation %USERPROFILE%\.cursor\skills\ai-agent-documentation
```

### 3. Verify Cursor is working
Open Cursor, start a new chat, and confirm Agent mode is available.

---

## Exercise Index

| Section | Exercise File | Topic |
|---------|--------------|-------|
| 4 | `exercises/04-rules-workshop.md` | Write personal and project rules |
| 5 | `exercises/05-skills-workshop.md` | Build the `create-adr-simple` skill |
| 6 | `exercises/06-mcp-anatomy.md` | Document and understand the MCP server |
| 7 | `exercises/07-capstone-kickoff.md` | Plan + ADR + rules before coding |
| 8 | `exercises/08-capstone-build.md` | Build the mCase config dictionary |

---

## Reference

Keep `reference/decision-guide.md` open throughout the day — it answers the "which tool do I reach for?" question.

`reference/prompting-patterns.md` has 7 patterns for better Agent mode prompts.

---

## Slides

Open `slides/index.html` in a browser. Navigate with arrow keys.
