const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const expressSwagger = require('express-swagger-generator')(app);
const swaggerUi = require('express-swaggerize-ui');

const userRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');
const { database } = require('./config');
const { normalizePort, onError, onListening } = require('./utils/utils');

mongoose
  .connect(database, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/**
 * Routers.
 */

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

/**
 * Create swagger UI.
 */

let options = {
  swaggerDefinition: {
    info: {
      description: 'Some server',
      title: 'Swagger-UI',
      version: '1.0.0',
    },
    host: 'localhost:8888',
    basePath: '/api',
    produces: ['application/json', 'application/xml'],
    schemes: ['http'],
  },
  basedir: __dirname,
  files: ['./routes/*.js'],
};
expressSwagger(options);

app.use('/api-docs.json', function(req, res) {
  res.json(require('./path/to/swaggerize/docs.json'));
});
app.use('/api-docs', swaggerUi());

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8888');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
