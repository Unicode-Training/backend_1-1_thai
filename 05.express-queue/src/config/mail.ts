export const MAIL_CONFIG = {
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_USERNAME: process.env.SMTP_USERNAME || "",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
    SMTP_PORT: process.env.SMTP_PORT || 465,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL || "",
    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || "",
}