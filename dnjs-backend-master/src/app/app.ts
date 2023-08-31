import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
// import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import Routes from './routers/index';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:8000',
  'https://book-store-five-theta.vercel.app',
  'https://book-store-admin-ruby.vercel.app',
  'http://localhost:5173',
  'http://localhost:8080',
];
const app: Express = express();
// middleware
app.use(cookieParser());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));
// CORS configuration
const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(helmet());

// database

//doc duong dan static
app.use(express.static(path.join(__dirname, '../../public')));
// router
Routes(app);
// hanle error

export default app
