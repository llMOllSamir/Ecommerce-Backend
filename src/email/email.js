import { createTransport } from "nodemailer";
import { emailTemplate, resetTemplate } from "./template.js";

export async function sendEmail(email, token) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `"E-commerce" <${process.env.SEND_EMAIL}>`, // sender address
    to: `<${email}>`,
    subject: "E-Commerce Verifying", // Subject line
    text: "Verify Email", // plain text body
    html: emailTemplate(token), // html body
  });
}

export async function resetPass(email, code) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `"E-commerce" <${process.env.SEND_EMAIL}>`, // sender address
    to: `<${email}>`,
    subject: "E-Commerce Verifying", // Subject line
    text: "Verify Email", // plain text body
    html: resetTemplate(code), // html body
  });
}
