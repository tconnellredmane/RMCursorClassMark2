#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { getMCaseApiClient } from './config.js';

const server = new Server(
  { name: "mcase-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const mcaseClient = getMCaseApiClient();

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "greet",
        description: "Greet someone by name",
        inputSchema: {
          type: "object",
          properties: { name: { type: "string", description: "Name to greet" } },
          required: ["name"],
        },
      },
      {
        name: "schema",
        description: "Get all datalists schema information",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "all_datalists",
        description: "Get all datalists with summary information",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "datalist_by_id",
        description: "Get a specific datalist by ID",
        inputSchema: {
          type: "object",
          properties: { id: { type: "number", description: "The ID of the datalist" } },
          required: ["id"],
        },
      },
      {
        name: "datalist_by_name",
        description: "Get a specific datalist by name",
        inputSchema: {
          type: "object",
          properties: { name: { type: "string", description: "The name of the datalist" } },
          required: ["name"],
        },
      },
      {
        name: "all_relationships",
        description: "Get all relationships between datalists",
        inputSchema: { type: "object", properties: {} },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const errorResponse = (err: unknown) => ({
    content: [{
      type: "text",
      text: JSON.stringify({
        error: "Failed to connect to mCase API",
        message: err instanceof Error ? err.message : String(err),
        mockData: null
      }, null, 2),
    }],
  });

  try {
    switch (name) {
      case "greet":
        if (!args?.name || typeof args.name !== "string")
          throw new McpError(ErrorCode.InvalidParams, "Name parameter is required");
        return { content: [{ type: "text", text: `Hello, ${args.name}!` }] };

      case "schema":
      case "all_datalists":
        try {
          return { content: [{ type: "text", text: JSON.stringify(await mcaseClient.getAllDataLists(), null, 2) }] };
        } catch (err) { return errorResponse(err); }

      case "datalist_by_id":
        if (!args?.id || typeof args.id !== "number")
          throw new McpError(ErrorCode.InvalidParams, "ID parameter is required and must be a number");
        try {
          return { content: [{ type: "text", text: JSON.stringify(await mcaseClient.getDatalistById(args.id), null, 2) }] };
        } catch (err) { return errorResponse(err); }

      case "datalist_by_name":
        if (!args?.name || typeof args.name !== "string")
          throw new McpError(ErrorCode.InvalidParams, "Name parameter is required and must be a string");
        try {
          return { content: [{ type: "text", text: JSON.stringify(await mcaseClient.getDatalistByName(args.name), null, 2) }] };
        } catch (err) { return errorResponse(err); }

      case "all_relationships":
        try {
          return { content: [{ type: "text", text: JSON.stringify(await mcaseClient.getAllRelationships(), null, 2) }] };
        } catch (err) { return errorResponse(err); }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof McpError) throw error;
    throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("mCase MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
