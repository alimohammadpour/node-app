import app from './app.js'
import dotenv from 'dotenv';
import { connectMongo } from './configs/mongo.js';

dotenv.config();

connectMongo();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})