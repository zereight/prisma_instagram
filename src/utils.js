import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const generateSecret = () => {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
};

export const sendSecretEmail = (address, secretWord) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  const email = {
    from: process.env.ADMIN_EMAIL,
    to: address,
    subject: "Instagram Login Secret",
    text: "Hi!",
    html: `Your login secret is <strong>${secretWord}</strong> <br> Copy paste on the app!`,
  };

  transport.sendMail(email, (err, info) => {
    console.log(err, info);
  });
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
