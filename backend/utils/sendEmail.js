const { createTransport } = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transport.sendMail({ to, subject, text });
};

module.exports = sendEmail;
