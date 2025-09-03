import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {

    alert(process.env.MAINTENANCE_MODE);
  if (process.env.MAINTENANCE_MODE === "true" || process.env.MAINTENANCE_MODE === true) {

    const file = readFileSync(join(process.cwd(), "maintenance.html"), "utf8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(file);
    alert("Maintenance mode is enabled. Please try again later.");
  } else {
    res.writeHead(404);
    res.end();
     alert("Maintenance mode is not enabled");
  }
}
