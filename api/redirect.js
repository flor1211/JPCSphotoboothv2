export default function handler(req, res) {
  if (process.env.MAINTENANCE_MODE === "true") {
    res.writeHead(302, { Location: "public/maintenance.html" });
    res.end();
  } else {
    res.writeHead(200);
    res.end();
  }
}
