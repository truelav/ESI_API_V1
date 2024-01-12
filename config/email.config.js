import dotenv from "dotenv";
dotenv.config();

// console.log(process.env)

const emailConfig = {
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export default emailConfig;
