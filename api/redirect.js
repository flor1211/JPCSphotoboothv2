export default function handler(req, res) {

  if (process.env.MAINTENANCE_MODE === "true" || process.env.MAINTENANCE_MODE === true) {

    res.writeHead(302, { Location: "/maintenance.html" });
    res.end();

  } else {
    res.writeHead(302, { Location: "/index.html" });
    res.end();

  }
}

