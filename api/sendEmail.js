import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    console.log("Incoming body:", req.body);

    const { name, email, image } = req.body;

    if (!name || !email || !image) {
        return res.status(400).json({ message: "Missing required fields" });
    }


    try {

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === "465",
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS 
            }
        });

        // Send email
        await transporter.sendMail({
            from: "JPCS Photobooth",
            to: email,
            subject: "JPCS Photobooth - Safe Ka Dito!",
            text: `Hi ${name}, here is your photostrip! Thank you for using JPCS Photobooth.`,
            attachments: [
                {
                    filename: `"${name}.png"`,
                    content: image.split("base64,")[1],
                    encoding: "base64"
                }
            ]
        });

        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending email", error: err.message });
    }
}
