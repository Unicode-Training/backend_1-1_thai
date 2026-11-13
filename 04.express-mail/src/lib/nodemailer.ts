//Kết nối
import nodemailer from "nodemailer";
import { MAIL_CONFIG } from "../config/mail.js";

export const transporter = nodemailer.createTransport({
    host: MAIL_CONFIG.SMTP_HOST,
    port: MAIL_CONFIG.SMTP_PORT,
    secure: +MAIL_CONFIG.SMTP_PORT === 465,
    auth: {
        user: MAIL_CONFIG.SMTP_USERNAME,
        pass: MAIL_CONFIG.SMTP_PASSWORD,
    },
});