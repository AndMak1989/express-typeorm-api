import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';
import { pagination } from 'typeorm-pagination';

import cors from 'cors';
import 'reflect-metadata';
import 'dotenv/config';
import AppError from '@shared/errors/AppError';
import routes from '@shared/http';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
app.use(routes);
app.use(errors());

app.listen(process.env.API_PORT || 3333, () => {
  console.log(`Server started on port - ${process.env.API_PORT}! 🏆`);
});
