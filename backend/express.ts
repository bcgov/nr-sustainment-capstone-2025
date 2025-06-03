import express, { Request, Response } from 'express';
import cors from 'cors';
import * as routers from './routes';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173/', // Replace with your frontend's origin or an array of allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', [
  routers.healthRouter,
  routers.dataRouter
]);

export default app;
