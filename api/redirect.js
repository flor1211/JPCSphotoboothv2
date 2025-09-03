import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
  if (process.env.MAINTENANCE_MODE === "true") {
    const file = readFileSync(join(process.cwd(), "maintenance.html"), "utf8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(file); // serve maintenance.html directly
  } else {
    res.status(200).end(); // let Vercel continue and serve index.html
  }
}
