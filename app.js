import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}));
  
app.use('/api', router);

export default app;