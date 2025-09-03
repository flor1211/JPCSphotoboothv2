import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {

  if (process.env.MAINTENANCE_MODE === "true" || process.env.MAINTENANCE_MODE === true) {

    const file = readFileSync(join(process.cwd(), "public", "maintenance.html"), "utf8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(file);

  } else {
    res.writeHead(404);
    res.end();

  }
}
