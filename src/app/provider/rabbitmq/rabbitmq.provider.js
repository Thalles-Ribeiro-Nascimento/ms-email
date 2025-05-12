import amqp from 'amqplib';
import EmailService from '../../services/EmailService.js';

import dotenv from 'dotenv';

dotenv.config();

class RabbitMQConsumer {
    constructor() {
        this.uri = process.env.RABBITMQ_URI;
        this.queue = process.env.RABBITMQ_QUEUE;
    }

    async connectAndConsume() {
        try {
            const connection = await amqp.connect(this.uri);
            const channel = await connection.createChannel();

            await channel.assertQueue(this.queue, { durable: true });
            console.log(`Aguardando mensagens na fila`);

            channel.consume(this.queue, async (msg) => {
                if (msg) {
                    const messageContent = msg.content.toString();
                    console.log(`Mensagem recebida.`);

                    try {
                        const userData = JSON.parse(messageContent);
                        const { email, nome } = userData;
                        console.log(`Enviando e-mail para ${email}...`);

                        // Envia o e-mail para o usuário
                        await EmailService.sendEmail(
                            email,
                            'Bem-vindo ao nosso sistema!',
                            `Olá, ${nome}! Obrigado por se cadastrar.`,
                            nome
                        );

                        channel.ack(msg);
                    } catch (error) {
                        console.error('Erro ao processar a mensagem:', error);
                        channel.nack(msg); // Reenvia a mensagem para reprocessamento
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao conectar ao RabbitMQ:', error);
        }
    }
}

export default RabbitMQConsumer;
