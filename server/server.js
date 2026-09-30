import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

const { EMAIL_USER, EMAIL_APP_PASSWORD, DONATION_RECEIVER_EMAIL } = process.env;

if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !DONATION_RECEIVER_EMAIL) {
  console.error("Missing required environment variables: EMAIL_USER, EMAIL_APP_PASSWORD, DONATION_RECEIVER_EMAIL");
  process.exit(1);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

      if (localOriginPattern.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

app.post("/api/donation", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    country,
    countryCode,
    phone,
    amount,
    anonymous,
  } = req.body;

  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !amount?.toString().trim()) {
    return res.status(400).json({ error: "Missing required donation fields." });
  }

  const donorName = `${firstName.trim()} ${lastName.trim()}`;
  const anonymousText = anonymous ? "Yes" : "No";
  const phoneText = phone ? `${countryCode ?? ""} ${phone}`.trim() : "Not provided";

  const emailHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="color: #3c1361;">New donation detail submission</h2>
      <p style="font-size: 16px; color: #333;">
        Payment was made separately through the UPI QR code. This submission records donor details only and does not automatically verify the UPI transaction.
      </p>
      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px 0; font-weight: 700; width: 180px;">Donor Name</td>
          <td style="padding: 10px 0;">${donorName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Donor Email</td>
          <td style="padding: 10px 0;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Country</td>
          <td style="padding: 10px 0;">${country ?? "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Phone</td>
          <td style="padding: 10px 0;">${phoneText}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Donation Amount</td>
          <td style="padding: 10px 0;">${amount}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Anonymous Donation</td>
          <td style="padding: 10px 0;">${anonymousText}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: DONATION_RECEIVER_EMAIL,
      replyTo: email,
      subject: "New donation detail submission",
      html: emailHtml,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send donation email:", error);
    return res.status(500).json({ error: "Failed to submit donation details." });
  }
});

app.post("/api/volunteer", async (req, res) => {
  const { fullName, email, phone, interest, message } = req.body;
  const trimmedName = fullName?.toString().trim();
  const trimmedEmail = email?.toString().trim();
  const trimmedPhone = phone?.toString().trim();
  const trimmedInterest = interest?.toString().trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !trimmedName ||
    !trimmedEmail ||
    !trimmedPhone ||
    !trimmedInterest ||
    !emailRegex.test(trimmedEmail)
  ) {
    return res.status(400).json({ error: "Missing or invalid volunteer fields." });
  }

  const emailHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="color: #3c1361;">New Volunteer Application - ${trimmedName}</h2>
      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px 0; font-weight: 700; width: 190px;">Full Name</td>
          <td style="padding: 10px 0;">${trimmedName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Email</td>
          <td style="padding: 10px 0;">${trimmedEmail}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Phone</td>
          <td style="padding: 10px 0;">${trimmedPhone}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Area of Interest</td>
          <td style="padding: 10px 0;">${trimmedInterest}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700;">Message</td>
          <td style="padding: 10px 0;">${message?.toString().trim() || "Not provided"}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: DONATION_RECEIVER_EMAIL,
      replyTo: trimmedEmail,
      subject: `New Volunteer Application - ${trimmedName}`,
      html: emailHtml,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send volunteer email:", error);
    return res.status(500).json({ error: "Failed to submit volunteer application." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
