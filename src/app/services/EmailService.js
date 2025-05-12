import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendEmail(to, subject, text) {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
            });
            console.log(`E-mail enviado para ${to}`);
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
        }
    }
}

export default new EmailService();