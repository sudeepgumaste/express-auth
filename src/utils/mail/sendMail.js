// import { nodemailer } from "nodemailer";

const nodemailer = require("nodemailer");

export const sendMail = (reciever, subject, message) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.MAIL_ID, // sender address
    to: reciever, // list of receivers
    subject: subject, // Subject line
    html: message // plain text body
  };

  transporter.sendMail(mailOptions, err => {
    if (err) return err;
  });
};
