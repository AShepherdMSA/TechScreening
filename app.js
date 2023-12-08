const express = require('express');
const next = require('next');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const http = require('http')

const APP_NAME = 'Interview Express / Next boilerplate'
const APP_PORT = 3200;

const nextApp = next({ dev: true });
const nextHandle = nextApp.getRequestHandler();

global.__basedir = __dirname;

nextApp.prepare().then(() => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname)));

  app.use('/api', require('./server/routes/api'))

  app.get('*', (req, res) => {
    nextHandle(req, res);
  });

  const server = http.createServer(app)
  server.listen(APP_PORT, () => {});

  console.log(`Application ${APP_NAME} listening on port ${APP_PORT}`);
})

module.exports = { nextApp }
