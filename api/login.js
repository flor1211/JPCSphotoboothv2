import jwt from "jsonwebtoken";

    const SECRET = process.env.JWT_SECRET;

    export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { username, password } = req.body;

    // const validUser = process.env.USER;
    const validPass = process.env.PASS;

    // if (username === validUser && password === validPass) {
    if (password === validPass) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`);
        return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, error: "Invalid credentials"  });
    }
