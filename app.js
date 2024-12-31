import express from 'express';
import parser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import { connectMongo } from './configs/mongo.js';

dotenv.config();

const app = express();

app.use(parser.json());

app.use('/api', router);

connectMongo();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})