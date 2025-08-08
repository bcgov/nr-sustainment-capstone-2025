import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as routers from './routes';

var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins:( string | RegExp)[] = [
  'http://localhost:5173',
  'https://soil-assessment-tool-145.apps.silver.devops.gov.bc.ca',
  'https://nr-sustainment-capstone-2025-145-backend.apps.silver.devops.gov.bc.ca'
]

const corsOptions = {
  origin: (origin: string, callback: any) => {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowedOrigin => 
      allowedOrigin instanceof RegExp 
        ? allowedOrigin.test(origin) 
        : allowedOrigin === origin
    );

    const error = isAllowed ? null : new Error('Not allowed by CORS');

    callback(error, isAllowed);
  }, // Allow requests from these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // Allow cookies and authorization headers
};
app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use('/api', [
  routers.healthRouter,
  routers.dataRouter
]);
export default app;
