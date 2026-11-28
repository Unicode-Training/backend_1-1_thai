import { MAIL_CONFIG } from "../config/mail.js";
import { transporter } from "../lib/nodemailer.js";
import ejs from "ejs";
export const sendMail = async (to: string, subject: string, message: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"${MAIL_CONFIG.SMTP_FROM_NAME}" <${MAIL_CONFIG.SMTP_FROM_EMAIL}>`,
            to,
            subject,
            html: message
        });
        return info;
    } catch (err) {
        console.error("Error while sending mail:", err);
        return false;
    }
}

export const sendMailTemplate = async (to: string, subject: string, template: string, options = {}) => {
    const templatePath = process.cwd() + '/src/template';
    const html = await ejs.renderFile(`${templatePath}/${template}.ejs`, options);
    return sendMail(to, subject, html);
}