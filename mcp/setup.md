# mCase MCP Server — Setup Guide

The mCase MCP server gives Cursor the ability to query live mCase configuration data during a conversation. It exposes tools like `schema`, `datalist_by_name`, and `all_relationships` that the capstone app will use.

**Do this before the afternoon session starts.**

---

## Prerequisites

- Node.js 18+ installed (`node --version` to check)
- Cursor with an active subscription

---

## Step 1: Get Credentials

Credentials are provided by the instructor at the start of the afternoon session:

| Variable | Value |
|----------|-------|
| `MCASE_API_URL` | `https://innovation-app-mcs-mcase01.redmane-cloud.us/resource` |
| `MCASE_API_USER` | *(provided in class)* |
| `MCASE_API_PASSWORD` | *(provided in class)* |

---

## Step 2: Add to Cursor MCP Settings

**Option A — Edit the MCP settings file directly (recommended)**

Cursor's global MCP config lives at:
- **Windows:** `%USERPROFILE%\.cursor\mcp.json`
- **macOS/Linux:** `~/.cursor/mcp.json`

Open (or create) that file and add the configuration from `mcp.json`:

```json
{
  "mcpServers": {
    "mCase": {
      "command": "npx",
      "args": [
        "--registry=http://redmane-npm.eastus.azurecontainer.io:4873",
        "@redmane/mcase-mcp-server"
      ],
      "env": {
        "MCASE_API_URL": "https://innovation-app-mcs-mcase01.redmane-cloud.us/resource",
        "MCASE_API_USER": "YOUR_USERNAME",
        "MCASE_API_PASSWORD": "YOUR_PASSWORD"
      }
    }
  }
}
```

Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with the credentials from the instructor.

**Option B — Cursor Settings UI**

Cursor Settings → MCP → Add Server → paste the configuration.

---

## Step 3: Restart Cursor

Close and reopen Cursor. The MCP server starts automatically.

---

## Step 4: Verify

Open a new Cursor chat (Agent mode). Ask:

```
Use the mCase MCP to list all available datalists.
```

You should see a list of datalist names returned from the live mCase instance. If you see an error, see Troubleshooting below.

---

## Quick Verification Prompts

Once connected, try these to confirm each tool works:

```
What datalists are available in mCase? (uses: schema)
Show me all the fields in the Cases datalist. (uses: datalist_by_name)
What relationships exist between datalists? (uses: all_relationships)
```

---

## Troubleshooting

### "npx: command not found" or "node is not recognized"
Node.js is not installed or not in PATH.
- Download from [nodejs.org](https://nodejs.org) (LTS version)
- Restart your terminal after installing

### "Cannot find package @redmane/mcase-mcp-server"
The private registry is unreachable.
- Check your network connection
- Verify the registry URL: `http://redmane-npm.eastus.azurecontainer.io:4873`
- Test: `npm view @redmane/mcase-mcp-server --registry=http://redmane-npm.eastus.azurecontainer.io:4873`

### MCP server appears but returns errors
Credentials are wrong or the mCase instance is unreachable.
- Double-check `MCASE_API_USER` and `MCASE_API_PASSWORD` in your config
- Verify the API URL ends with `/resource`
- Try the quick verification prompt above

### Server shows as "connected" but Cursor doesn't call it
Cursor may not recognize when to call MCP tools automatically. Be explicit:
```
Use the mCase MCP schema tool to list all datalists.
```

---

## How It Works (for Section 6)

The MCP server runs as a local process launched by Cursor via `npx`. It:
1. Connects to the mCase API using your credentials
2. Exposes six tools Cursor can call during conversation
3. Caches template data after the first call (faster subsequent queries)

The source code is in `cursor-workshop/mcp-server-source/` — you'll explore it with the `ai-agent-documentation` skill during the MCP Anatomy section.
