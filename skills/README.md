# Cursor Skills — Installation Guide

This folder contains three skills used in the class:

| Skill | Purpose | When you use it |
|-------|---------|----------------|
| `create-adr-simple/` | The skill YOU build in Section 5 | Section 7: write your stack ADR |
| `create-adr/` | The production version (comparison only) | Section 5: compare to yours |
| `ai-agent-documentation/` | Generate AI reference docs for a codebase | Section 6: document the MCP server |

---

## How Cursor Skills Work

A skill is a `SKILL.md` file Cursor reads when you reference it in chat. Skills live in:

- **Global:** `~/.cursor/skills/` (Windows: `%USERPROFILE%\.cursor\skills\`) — available in all projects
- **Project:** `.cursor/skills/` in the project root — available only in that project

For this class, install skills globally so they're available in any workspace.

---

## Installing the Skills

### Windows (Command Prompt or PowerShell)

```cmd
rem Create the skills directory if it doesn't exist
mkdir "%USERPROFILE%\.cursor\skills"

rem Copy both production skills
xcopy /E /I "cursor-workshop\skills\create-adr" "%USERPROFILE%\.cursor\skills\create-adr"
xcopy /E /I "cursor-workshop\skills\ai-agent-documentation" "%USERPROFILE%\.cursor\skills\ai-agent-documentation"
```

### macOS / Linux

```bash
mkdir -p ~/.cursor/skills
cp -r cursor-workshop/skills/create-adr ~/.cursor/skills/
cp -r cursor-workshop/skills/ai-agent-documentation ~/.cursor/skills/
```

### Or: Install via Cursor Settings

Cursor Settings → Skills → Add Skill → point to the SKILL.md file path.

---

## Verifying Installation

After installing, open a new Cursor chat and type:
```
What skills do you have available?
```

You should see `create-adr` and `ai-agent-documentation` listed.

---

## Using Skills in Chat

Reference a skill by name:
```
@create-adr — Create an ADR for our tech stack decision
```

Or just describe what you want and Cursor will invoke the skill:
```
Document this decision as an ADR.
```

---

## About `create-adr-simple`

This is the **target** you're building toward in Section 5. It's intentionally minimal:
- Three trigger phrases
- Three-step workflow
- Core ADR template only

The goal of the exercise is to build something equivalent from scratch, then compare to the production `create-adr` skill. Don't look at it beforehand.
