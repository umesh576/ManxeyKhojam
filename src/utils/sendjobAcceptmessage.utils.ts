import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport(<SMTPTransport.Options>{
  host: "smtp.gmail.com",
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

interface IsendMail {
  to: string;
  subject: string;
  html: string;
}
export const sendJobAcceptMessage = async (sendMail: IsendMail) => {
  try {
    const mailOption = {
      from: `"${process.env.MAIL_FROM}"<${process.env.SMPT_MAIL}>`,
      to: sendMail.to,
      subject: sendMail.subject,
      html: sendMail.html,
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("error");
  }
};
