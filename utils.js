import randomwords from "random-words";
import nodemailer from "nodemailer";

export const generateSecret = () => {
  const word = randomwords({ excactly: 2 });
  return `${words[0]} ${words[1]}`;
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
