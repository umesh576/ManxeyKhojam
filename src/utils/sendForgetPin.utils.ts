import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
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
export const sendOtp = async (sendMail: IsendMail) => {
  try {
    const mailOption = {
      from: `"${process.env.MAIL_FROM}"<${process.env.SMPT_MAIL}>`,
      to: sendMail.to,
      subject: sendMail.subject, // Fixed typo
      html: sendMail.html,
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};
