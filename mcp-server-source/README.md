# mCase MCP Server — Source Code

This is the source code for the `@redmane/mcase-mcp-server` package installed in your Cursor MCP settings.

**You do not need to build or run this code.** The server runs via `npx` as configured in `mcp/mcp.json`.

This source is here for **Section 6 (MCP Anatomy)** — you'll open this folder in Cursor and use the `ai-agent-documentation` skill to rapidly understand what the server does, what tools it exposes, and how it processes data.

---

## Structure

```
src/
├── index.ts              MCP server entry — tool definitions and request handlers
├── config.ts             Loads env vars; creates the API client
├── mcaseApiClient.ts     HTTP client; caches templates; implements all tool logic
├── templateProcessor.ts  Transforms raw /Templates API data into clean DatalistDefinitions
└── types.ts              All TypeScript interfaces
```

## What the Server Does

The server exposes 6 tools over stdio MCP transport:

| Tool | What it returns |
|------|----------------|
| `greet` | Smoke test only |
| `schema` | `DatalistSummary[]` — Id, Label, SystemName, FieldCount |
| `all_datalists` | Same as `schema` |
| `datalist_by_name` | Full `DatalistDefinition` with `Fields[]` and `Children[]` |
| `datalist_by_id` | Same as above using numeric Id |
| `all_relationships` | `Relationship[]` — parent/child and dynamic link relationships |

## Key Concepts for Section 6

**What `templateProcessor.ts` filters out:**
- Fields where the section, header, or field itself is marked `Hidden=Yes`
- Mirror fields (where `defaultValue` starts with `{`)
- Fields with systemName `USERROLESECURITY`

**The `FieldDefinition` shape** (what your capstone app will render):
```typescript
{
  fieldId, label, systemName,
  addType,        // field type: "Text", "Date", "Picklist", "Dynamic", etc.
  required,
  hidden, isMirror,
  values: string[],  // picklist options
  source?: number,   // for Dynamic fields: ID of the linked datalist
  description
}
```

**Template caching:** `loadTemplates()` calls `/Templates` once and caches the result in memory. Subsequent tool calls reuse the cache.
