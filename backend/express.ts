import express, { Request, Response } from 'express';
import * as routers from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', [
  routers.healthRouter,
]);

export default app;
