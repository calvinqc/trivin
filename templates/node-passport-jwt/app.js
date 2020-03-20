import express from 'express';
import logger from 'winston';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';

import { config } from './store/config';
import { applyPassportStrategy } from './store/passport';
import { userController, mailingController } from './controller';

const app = express();

// Set up CORS
app.use(cors());

// Apply strategy to passport
applyPassportStrategy(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API
app.use('/', userController);
app.use('/mailing', mailingController);

/**
 * Get port from environment and store in Express.
 */
const { port, mongoDBUri, mongoHostName } = config.env;
app.listen(port, () => {
  logger.info(`Started successfully server at port ${port}`);
  mongoose
    .connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      logger.info(`Conneted to mongoDB at ${mongoHostName}`);
    });
});
