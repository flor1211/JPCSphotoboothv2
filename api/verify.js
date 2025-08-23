import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;
  try {
    jwt.verify(token, SECRET);
    return res.status(200).json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
}
