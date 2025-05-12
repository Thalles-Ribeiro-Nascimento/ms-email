import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../database/db.js';

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

    async sendEmail(to, subject, text, user) {
        try {
            // Envia o e-mail utilizando o transporter configurado
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
            });
            console.log(`E-mail enviado para ${to}`);

            // Conecta ao banco de dados
            db.conection();

            // Cria os dados do log
            const logData = {
                descricao: "Email enviado com sucesso",
                status: "OK",
                email: to,
                usuario: user,
            };

            // Insere o log no banco de dados
            db.sql_insert(logData);

        } catch (error) {
            // Trata erros ao enviar o e-mail
            console.error('Erro ao enviar e-mail:', error);
        }
    }
}

export default new EmailService();