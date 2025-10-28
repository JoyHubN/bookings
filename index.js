import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import booking from './endpoints/booking.js'
import prisma from './prisma_client.js';

dotenv.config({path: path.resolve(process.cwd(), 'config/.env')});

const app = express();
const PORT  = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', booking);


app.use((req, res)=>{
    return res.status(404).send({message: 'URL-адрес не найден!'})
})

const start = async () => {
  try {
    await prisma.$connect()
    app.listen(PORT, () => console.log(`server started localhost:${PORT}`));
  }
  catch (e) {
    await prisma.$disconnect()
    console.log(e);
  }

}

start();