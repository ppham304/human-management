const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Logger = require('./logger');
const rootRoute = require('./modules/routers');

const server = express();
const port = 4000;
const { Router } = express;
const mainRoute = new Router();

require('dotenv').config()

mainRoute.use('/api', rootRoute);
server.use(body_parser.json());

server.use(cors());
server.use(mainRoute);


mongoose.connect('mongodb+srv://cluster0-44bid.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
});

const db = mongoose.connection;

db.once('open', () => {
  Logger.info('[DB]: Established connection to database server.');
  Logger.info('[APP]: Starting server...');


  // Start your app.
  server.listen(port, (err) => {
    if (err) {
      return Logger.error(err.message);
    }

    Logger.appStarted(port, 'localhost');
  });
});

// prevent server from starting if db is not connected
db.on('error', (err) => {
  Logger.error('[DB]: Unable to connect to database server');
  Logger.error(`${err.message}`);
  Logger.error('[APP]: Server has been stopped!');
});
