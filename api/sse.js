

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { getweatherData } from "../utils/weather.js";

// Init once (singleton)
const server = new McpServer({
  name: "mcp-vercel-server",
  version: "1.0.0",
});

server.tool(
  "weatherdata",
  { city: z.string() },
  async ({ city }) => ({
    content: [
      { type: "text", text: JSON.stringify(await getweatherData(city)) },
    ],
  })
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const transport = new SSEServerTransport("/api/messages", res);
    await server.connect(transport);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
