import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
  if (process.env.MAINTENANCE_MODE === "true") {

    const file = readFileSync(join(process.cwd(), "public", "maintenance.html"), "utf8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(file);
  } else {

    const file = readFileSync(join(process.cwd(), "public", "index.html"), "utf8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(file);
  }
}
