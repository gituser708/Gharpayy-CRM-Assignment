// services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", //! we can use SMTP config for Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"CRM System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Email error:", err.message);
    return { status: "error", message: err.message };
  }
}

module.exports = { sendEmail };
