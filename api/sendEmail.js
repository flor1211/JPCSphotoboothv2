import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

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
            from: `"JPCS Photobooth" <${process.env.SMTP_USER}>` ,
            to: email,
            subject: "JPCS Photobooth - Pinoy Big Spartan: The House of Innovators (CICS Edition)",
            // text: `Hi ${name}, here is your photostrip! Thank you for using JPCS Photobooth.`,
            html: `<div style="font-family: Arial, sans-serif; line-height:1.6; padding:20px;">
                    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        
                        <h2 style="color:#333; margin-top:0;">Hi ${name},</h2>
                        <p style="font-size:16px; color:#555;">
                        Thank you for using <strong>JPCS Photobooth</strong>!📸 <br>
                        The attached file is your photostrip.
                        </p>

                        <p style="font-size:15px; color:#555;">
                        We hope you enjoyed the experience!  
                        Don’t forget to share the memories. 💙
                        </p>

                        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;"/>

                        <p style="font-size:13px; color:#888; text-align:center; margin-top:20px;">
                        — JPCS Photobooth Team (flor & juls)
                        <br/>Pinoy Big Spartan: The House of Innovators (CICS Edition) ✨
                        </p>
                        

                    </div>
                    </div>
                    `,
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
