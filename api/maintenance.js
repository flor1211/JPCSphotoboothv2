import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
  const maintenance = process.env.MAINTENANCE_MODE === "true";

  if (maintenance) {
    const filePath = join(process.cwd(), "public", "maintenance.html");
    const html = readFileSync(filePath, "utf-8");

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(html);
  }

  return res.status(404).end();
}
