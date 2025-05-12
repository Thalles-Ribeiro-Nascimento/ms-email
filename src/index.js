import express from 'express';
import dotenv from 'dotenv';
import RabbitMQConsumer from '../src/app/provider/rabbitmq/rabbitmq.provider.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;


app.listen(PORT, () => {
    console.log(`Microsserviço de E-mail rodando na porta ${PORT}`);
});

const consumer = new RabbitMQConsumer();
consumer.connectAndConsume();
