import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

// MIDDLEWARES.

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// define your routes here. eg
// app.use('/api/v1/farmers', farmerRouter);

app.use('*', (req, res) => res.status(404).json({
  Message: 'URL DOES NOT EXIST, Please counter check'
}));

export default app;
