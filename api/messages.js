

import { getweatherData } from "../utils/weather.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { tool, parameters } = req.body;

  if (tool === "weatherdata") {
    const result = await getweatherData(parameters.city);
    return res.status(200).json(result);
  }

  res.status(400).json({ error: "Tool not found" });
}
