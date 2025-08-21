import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    if (!name || !email || !image) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const { name, email, image } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === "465",
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS 
            }
        });

        // Send email
        await transporter.sendMail({
            from: "Photobooth",
            to: email,
            subject: "Your Photobooth Collage",
            text: `Hi ${name}, here is your photo booth collage!`,
            attachments: [
                {
                    filename: `"${name}.png"`,
                    content: image.split("base64,")[1],
                    encoding: "base64"
                }
            ]
        });

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending email", error: err.message });
    }
}
