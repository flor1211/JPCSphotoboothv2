import jwt from "jsonwebtoken";
import { parse } from "cookie";

const SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    jwt.verify(token, SECRET);
    return res.status(200).json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
}
