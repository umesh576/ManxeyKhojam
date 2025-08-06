import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const tansporter = nodemailer.createTransport(<SMTPTransport.Options>{
  host: "smpt.gmail.com",
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === "456",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

interface ISendMail {
  to: string;
  html: string;
  subject: string;
}

export const sendRejectMessage = async (sendMail: ISendMail) => {
  try {
    const mailOption = {
      from: `"${process.env.MAIL_FROM}"<${process.env.SMPT_MAIL}>`,
      to: sendMail.to,
      subject: sendMail.subject,
      html: sendMail.html,
    };
    await tansporter.sendMail(mailOption);
  } catch (e) {
    console.log(e);
  }
};
